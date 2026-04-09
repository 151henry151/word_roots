#!/usr/bin/env python3
"""
Extract dictionary entries from Borror PDF using pdftotext -layout (two-column pages).

Requires: pdftotext (poppler-utils).
"""

from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

# Language tag before gloss: space + (LANG). — may appear more than once if OCR merged lines.
LANG_DOT_RE = re.compile(r"\s+\(([^)]+)\)\.\s*")

# Split two columns: wide whitespace run (4+ spaces).
COL_SPLIT_RE = re.compile(r"\s{4,}")

# Typo in OCR: (Gj. instead of (G).
def fix_ocr_typos(segment: str) -> str:
    return segment.replace("(Gj.", "(G).")


def pdftotext_layout(pdf_path: Path) -> str:
    try:
        out = subprocess.check_output(
            ["pdftotext", "-layout", str(pdf_path), "-"],
            stderr=subprocess.PIPE,
            text=True,
            errors="replace",
        )
    except FileNotFoundError:
        print("pdftotext not found; install poppler-utils (e.g. apt install poppler-utils)", file=sys.stderr)
        sys.exit(1)
    except subprocess.CalledProcessError as e:
        print(e.stderr, file=sys.stderr)
        sys.exit(1)
    return out


def find_dictionary_slice(lines: list[str]) -> tuple[int, int]:
    """Return [start, end) line indices covering the roots dictionary (line-based; loses form feeds)."""
    start = 0
    for i, ln in enumerate(lines):
        if "acalanth" in ln and "(" in ln:
            start = i
            break
    end = len(lines)
    for i in range(start + 1, len(lines)):
        ln = lines[i]
        if "Formulation of Scientific Names" not in ln:
            continue
        nxt = lines[i + 1] if i + 1 < len(lines) else ""
        if "The scientific naming" in nxt:
            end = i
            break
    return start, end


def iter_dictionary_pages(raw_text: str):
    """
    Split on form feeds so each physical PDF page is processed separately.
    `splitlines()` drops \\f, so page boundaries must come from the raw string.
    """
    for page in raw_text.split("\f"):
        lines = page.splitlines()
        if not lines:
            continue
        yield lines


def pages_for_dictionary_entries(raw_text: str):
    """Yield line lists, one per page, from first dictionary line through end of dictionary."""
    started = False
    for lines in iter_dictionary_pages(raw_text):
        if not started:
            idxs = [i for i, ln in enumerate(lines) if "acalanth" in ln and "(" in ln]
            if not idxs:
                continue
            started = True
            lines = lines[idxs[0] :]
        cut = None
        for i, ln in enumerate(lines):
            if "Formulation of Scientific Names" not in ln:
                continue
            nxt = lines[i + 1] if i + 1 < len(lines) else ""
            if "The scientific naming" in nxt:
                cut = i
                break
        if cut is not None:
            lines = lines[:cut]
            if lines:
                yield lines
            break
        if lines:
            yield lines


def split_columns(line: str) -> list[str]:
    line = line.rstrip()
    if not line.strip():
        return []
    parts = COL_SPLIT_RE.split(line)
    return [fix_ocr_typos(p.strip()) for p in parts if p.strip()]


# Right-column-only lines in pdftotext -layout begin far to the right (left column blank).
RIGHT_COLUMN_MIN_LEADING_SPACES = 20


def line_left_right(line: str) -> tuple[str | None, str | None]:
    """Split one layout line into left and right column text (two-column dictionary page)."""
    raw = line.rstrip()
    if not raw.strip():
        return None, None
    parts = COL_SPLIT_RE.split(raw)
    parts = [fix_ocr_typos(p.strip()) for p in parts if p.strip()]
    if len(parts) >= 2:
        return parts[0], parts[1]
    if len(parts) == 1:
        lead = len(raw) - len(raw.lstrip(" "))
        if lead >= RIGHT_COLUMN_MIN_LEADING_SPACES:
            return None, parts[0]
        return parts[0], None
    return None, None


def should_skip_layout_line(line: str) -> bool:
    """Running titles, page numbers, and blank lines — not dictionary entries."""
    s = line.strip()
    if not s:
        return True
    if "Dictionary of Word Roots" in line and "Combining" in line:
        return True
    if "Dicationary" in line:
        return True
    if re.match(r"^\s*and Combining F", line):
        return True
    if re.match(r"^\s*\d{1,3}\s*$", s) and len(s) <= 5:
        return True
    if "Word R o o t s" in line and "Dictionary" not in line:
        return True
    return False


def roots_look_valid(roots: str) -> bool:
    """Borror headwords do not begin with a parenthesis; they contain letters."""
    r = roots.strip()
    if len(r) < 1:
        return False
    if r.startswith("("):
        return False
    if not re.search(r"[a-zA-Z]", r):
        return False
    return True


def salvage_roots(roots: str) -> str | None:
    """If OCR merged a gloss into the roots, keep the last ';'-separated piece that looks like a headword."""
    if roots_look_valid(roots):
        return roots.strip()
    parts = [p.strip() for p in roots.split(";")]
    for part in reversed(parts):
        if roots_look_valid(part):
            return part
    return None


# A second headword inside the gloss. Must not match bare "«a" / "«s" (combining-form fragments):
# the capture must start with a Latin letter, OR be « followed by 3+ letters (e.g. «alca).
CONCAT_ENTRY_IN_MEANING = re.compile(
    r"\s+((?:[a-zA-Z][a-zA-Z«=*,\-0-9]*|«[a-zA-Z]{3,}))\s+\(([A-Za-z][A-Za-z ]*)\)\.\s*",
)

# Two column entries run together: "… Of copper, money agel, =a (G). A herd" — the comma–equals
# form must match explicitly; a generic "word (LANG)." pattern cannot allow spaces inside the
# capture or it greedily eats from the first space in the gloss.
CONCAT_COMMA_EQUALS_HEADWORD = re.compile(
    r"\s+([a-zA-Z][a-zA-Z,=\-]*,\s*=[a-zA-Z]+)\s+\(([A-Za-z][A-Za-z ]*)\)\.\s*",
)


def split_concatenated_meaning(meaning: str) -> tuple[str, str | None]:
    """If meaning contains a second 'roots (LANG).', return gloss and tail for another parse."""
    m = CONCAT_COMMA_EQUALS_HEADWORD.search(meaning)
    if not m:
        m = CONCAT_ENTRY_IN_MEANING.search(meaning)
    if not m:
        return meaning, None
    return meaning[: m.start()].strip(), meaning[m.start() :].strip()


def roots_has_embedded_lang_tag(roots: str) -> bool:
    """True if OCR merged two headwords — roots should not contain a second '(LANG).' gloss tag."""
    return bool(re.search(r"\s\([A-Z][a-z]{0,14}\)\.\s", roots))


def roots_is_concat_fragment(roots: str) -> bool:
    """Reject bogus headwords produced by bad splits (bare « + one letter, etc.)."""
    r = roots.strip()
    if r in {"«a", "«o", "«s", "«e", "«i"}:
        return True
    if re.fullmatch(r"«[a-zA-Z]{1,2}", r):
        return True
    return False


def parse_segment(seg: str) -> list[dict]:
    """Parse one layout cell; may return two dicts if two entries were concatenated without a column gap."""
    seg = seg.strip()
    if not seg:
        return []
    seg = fix_ocr_typos(seg)
    matches = list(LANG_DOT_RE.finditer(seg))
    if not matches:
        return []

    # Prefer the leftmost '(LANG).' whose roots salvage to a real headword (first match is usually correct).
    for m in matches:
        roots_raw = seg[: m.start()].strip()
        lang = re.sub(r"\s+", " ", m.group(1).strip())
        meaning = seg[m.end() :].strip()
        if not meaning:
            continue
        salvaged = salvage_roots(roots_raw)
        if salvaged is None:
            continue
        if roots_has_embedded_lang_tag(salvaged):
            continue
        meaning, tail = split_concatenated_meaning(meaning)
        if not meaning and tail:
            return parse_segment(tail)
        if roots_is_concat_fragment(salvaged):
            continue
        row: dict = {
            "roots": salvaged,
            "langCode": lang,
            "meaning": meaning,
        }
        out = [row]
        if tail:
            out.extend(parse_segment(tail))
        return out
    return []


def extract_entries_from_page_lines(page_lines: list[str]) -> list[dict]:
    """
    One printed page: full left column top-to-bottom, then full right column.
    """
    entries: list[dict] = []
    left_segments: list[str] = []
    right_segments: list[str] = []
    for line in page_lines:
        if should_skip_layout_line(line):
            continue
        left, right = line_left_right(line)
        if left:
            left_segments.append(left)
        if right:
            right_segments.append(right)

    for seg in left_segments + right_segments:
        for row in parse_segment(seg):
            if roots_is_concat_fragment(row["roots"]):
                continue
            row["rawSegment"] = seg[:500]
            entries.append(row)
    return entries


def extract_dictionary(raw_text: str) -> list[dict]:
    """All dictionary pages: each page is read left column then right column."""
    entries: list[dict] = []
    for page_lines in pages_for_dictionary_entries(raw_text):
        entries.extend(extract_entries_from_page_lines(page_lines))
    return entries


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    pdf = root / "dictionary_of_word_roots_and_combining_forms_borror.pdf"
    out_json = root / "web" / "public" / "dictionary.json"
    if len(sys.argv) > 1:
        pdf = Path(sys.argv[1])

    text = pdftotext_layout(pdf)
    entries = extract_dictionary(text)
    # De-dupe while preserving order
    seen: set[tuple[str, str, str]] = set()
    unique: list[dict] = []
    for e in entries:
        key = (e["roots"], e["langCode"], e["meaning"])
        if key in seen:
            continue
        seen.add(key)
        unique.append(e)

    # Book order: per page, full left column then full right column (form-feed pages).
    for i, e in enumerate(unique):
        e["id"] = i

    out_json.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "source": "Donald J. Borror, Dictionary of Word Roots and Combining Forms (1960)",
        "order": "book-columns",
        "entryCount": len(unique),
        "entries": unique,
    }
    out_json.write_text(json.dumps(payload, ensure_ascii=False, indent=0), encoding="utf-8")
    print(f"Wrote {len(unique)} entries to {out_json}", file=sys.stderr)


if __name__ == "__main__":
    main()
