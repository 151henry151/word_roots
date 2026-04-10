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
    """Normalize OCR: the printed book uses '=' for terminal stems, not guillemets."""
    s = segment.replace("(Gj.", "(G).")
    s = s.replace("«", "=")
    # Missing space before '(' so LANG_DOT_RE can see (G). / (L). — e.g. "aleth,-o(G)." → "aleth, -o (G)."
    s = re.sub(r",\s*(-[a-zA-Z0-9]+)\(([A-Za-z][A-Za-z ]*)\)\.", r", \1 (\2).", s)
    # "x(G)." / "x(L)." with no space before parenthesis
    s = re.sub(r"([a-zA-Z0-9,=])(\([GL][a-z]{0,14}\)\.)", r"\1 \2", s)
    # Glued tags: "(G).(G)." → "(G). (G)."
    s = re.sub(r"\(([GL][a-z]{0,14}\)\.)\(([GL][a-z]{0,14}\)\.)", r"\1 \2", s)
    # OCR junk before 'Grinding' on the aleo page
    s = re.sub(r"«urn\s*", " ", s)
    return s


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


# One pdftotext line may contain two entries if the column gap is only 2–3 spaces (below COL_SPLIT width).
# Each fragment is "roots (LANG). gloss…"; find multiple headwords and split into separate cells.
_JAMMED_ENTRY_HEAD = re.compile(
    r"(?:^|\s{2,})([=a-zA-Z«][a-zA-Z0-9,=«\s\-,]*)\s+\(([^)]+)\)\.",
)


def _looks_like_borror_roots(s: str) -> bool:
    """Heuristic: headword field vs English gloss (e.g. 'Stand apart' is not roots)."""
    s = s.strip()
    if not roots_look_valid(s):
        return False
    if s.startswith("("):
        return False
    # Before the first comma, Borror has a single stem token (not "stinging drom").
    first = s.split(",")[0].strip()
    if " " in first:
        return False
    # English lists use ", word" — Borror uses ", -o" / ", =a". Reject ", be" / ", distant".
    if re.search(r",\s+(?![-=])[a-zA-Z]", s):
        return False
    # Two+ lowercase words with no comma / = / hyphen stem pattern — almost always gloss, not roots.
    if "," not in s and "=" not in s and "-" not in s:
        parts = s.split()
        if len(parts) >= 2 and all(p.isalpha() and p[0].islower() for p in parts):
            return False
    return True


def _split_gap_between_entries(gap: str) -> tuple[str, str] | None:
    """
    Given text between '(LANG1).' and the next '(LANG2).', split English gloss of entry 1 from
    roots of entry 2. Prefer the longest suffix that looks like a Borror headword (e.g. 'doro',
    'drom, -a, …, =us').
    """
    gap = gap.strip()
    if not gap:
        return None
    best: tuple[str, str] | None = None
    best_roots_len = -1
    for m in re.finditer(r"\s+", gap):
        gloss = gap[: m.start()].strip()
        roots = gap[m.end() :].strip()
        if not gloss or not roots:
            continue
        if not _looks_like_borror_roots(roots):
            continue
        if len(roots) > best_roots_len:
            best_roots_len = len(roots)
            best = (gloss, roots)
    return best


def _split_jammed_by_lang_tags(cell: str) -> list[str] | None:
    """Split on multiple 'roots (LANG).' groups when a narrow gutter merged two columns into one line."""
    matches = list(LANG_DOT_RE.finditer(cell))
    if len(matches) < 2:
        return None
    m0, m1 = matches[0], matches[1]
    gap = cell[m0.end() : m1.start()]
    sp = _split_gap_between_entries(gap)
    if sp is None:
        return None
    _, roots_next = sp
    idx = cell.find(roots_next, m0.end(), m1.start() + 1)
    if idx < 0:
        idx = cell.rfind(roots_next, m0.end(), min(len(cell), m1.start() + len(roots_next) + 4))
    if idx < 0:
        return None
    first = cell[:idx].strip()
    rest = cell[idx:].strip()
    if not first or not rest:
        return None
    rest_parts = split_jammed_two_entries(rest)
    return [first] + rest_parts


def split_jammed_two_entries(cell: str) -> list[str]:
    """Split a layout fragment that accidentally contains two headwords (narrow column gutter in OCR)."""
    cell = cell.strip()
    if not cell:
        return []
    by_lang = _split_jammed_by_lang_tags(cell)
    if by_lang is not None:
        return by_lang
    matches = list(_JAMMED_ENTRY_HEAD.finditer(cell))
    if len(matches) <= 1:
        return [cell]
    out: list[str] = []
    for i, m in enumerate(matches):
        start = m.start()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(cell)
        piece = cell[start:end].strip()
        if piece:
            out.append(piece)
    return out


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


# A second headword inside the gloss (single space between gloss and next root is common).
# Must not match bare "=a" / "=s" fragments — see roots_is_concat_fragment.
# Includes "=stem, -o (G)." after fix_ocr_typos maps « to =.
# Allow spaces inside roots (e.g. "drom, -a, -ae, …, =us") so the whole headword matches before "(G).".
CONCAT_ENTRY_IN_MEANING = re.compile(
    r"\s+((?:[a-zA-Z][a-zA-Z0-9,=«\s\-,]*|=[a-zA-Z][a-zA-Z0-9,=«\s\-,]*|«[a-zA-Z][a-zA-Z0-9,=«\s\-,]*))\s+\(([A-Za-z][A-Za-z ]*)\)\.\s*",
)

# Two column entries run together: "… Of copper, money agel, =a (G). A herd" — the comma–equals
# form must match explicitly; a generic "word (LANG)." pattern cannot allow spaces inside the
# capture or it greedily eats from the first space in the gloss.
CONCAT_COMMA_EQUALS_HEADWORD = re.compile(
    r"\s+([a-zA-Z][a-zA-Z,=\-]*,\s*=[a-zA-Z]+)\s+\(([A-Za-z][A-Za-z ]*)\)\.\s*",
)


def _is_false_terminal_equals_concat(meaning: str, m: re.Match) -> bool:
    """OCR 'drom, -a, …, =us (G).' must not split at the terminal ', =us (G).' alone."""
    if m.start() == 0:
        return False
    if meaning[m.start() - 1] != ",":
        return False
    roots = m.group(1).strip()
    if not roots.startswith("="):
        return False
    return bool(re.fullmatch(r"=[a-zA-Z]{1,4}", roots))


def split_concatenated_meaning(meaning: str) -> tuple[str, str | None]:
    """If meaning contains a second 'roots (LANG).', return gloss and tail for another parse."""
    m = CONCAT_COMMA_EQUALS_HEADWORD.search(meaning)
    if m:
        return meaning[: m.start()].strip(), meaning[m.start() :].strip()

    matches = list(LANG_DOT_RE.finditer(meaning))
    # One '(LANG).' in the gloss: "…English… stem, -o, =us (G). rest" — split English from headword.
    if len(matches) == 1:
        m0 = matches[0]
        gap = meaning[: m0.start()].strip()
        sp = _split_gap_between_entries(gap)
        if sp is not None:
            gloss, roots = sp
            idx = meaning.find(roots, 0, m0.start() + 1)
            if idx < 0:
                idx = meaning.rfind(roots, 0, m0.start() + 1)
            if idx >= 0:
                return gloss.strip(), meaning[idx:].strip()
    # Two+ language tags in one meaning string
    if len(matches) >= 2:
        m0, m1 = matches[0], matches[1]
        gap = meaning[m0.end() : m1.start()]
        sp = _split_gap_between_entries(gap)
        if sp is not None:
            _, roots_next = sp
            idx = meaning.find(roots_next, m0.end(), m1.start() + 1)
            if idx < 0:
                idx = meaning.rfind(roots_next, m0.end(), m1.start() + 1)
            if idx >= 0:
                return meaning[:idx].strip(), meaning[idx:].strip()

    for m2 in CONCAT_ENTRY_IN_MEANING.finditer(meaning):
        if _is_false_terminal_equals_concat(meaning, m2):
            continue
        if not _looks_like_borror_roots(m2.group(1)):
            continue
        return meaning[: m2.start()].strip(), meaning[m2.start() :].strip()
    return meaning, None


# A new headword always contains a Borror language tag like (G). or (L). or (G My).
HAS_LANG_DOT = re.compile(r"\([^)]+\)\.\s")


def _gloss_after_first_lang(fragment: str) -> str | None:
    m = LANG_DOT_RE.search(fragment)
    if not m:
        return None
    return fragment[m.end() :].strip()


def _starts_hyphen_subentry_line(p: str) -> bool:
    """Lines like '-ales (the ending of plant order names)' are a new headword after 'aleo (G). …'."""
    s = p.strip()
    return bool(re.match(r"^-[a-zA-Z]", s))


def _is_roots_only_comma_line(p: str) -> bool:
    """A line that is only 'aleur,' / 'alet,' before more stem lines and one (G). tag."""
    return bool(re.match(r"^[a-zA-Z][a-zA-Z0-9,=\-]*,\s*$", p.strip()))


def _starts_new_fragment_hyphen_after_short_gloss(prev: str, p: str) -> bool:
    """Start a new column fragment before '-ales …' once the previous entry's gloss is complete."""
    if not prev or not _starts_hyphen_subentry_line(p):
        return False
    g = _gloss_after_first_lang(prev)
    if not g:
        return False
    g = g.strip()
    if g.endswith(","):
        return False
    # Short gloss such as 'Hot, warm' before a hyphenated sub-entry on the next line.
    return len(g) <= 80


def _gloss_incomplete_for_continuation(prev: str) -> bool:
    """True if text after the first '(LANG).' does not finish a normal sense (wrap continues on next line)."""
    g = _gloss_after_first_lang(prev)
    if not g:
        return False
    g = g.strip()
    if re.search(r"[.!?;:]\s*$", g):
        return False
    # Two-word senses like 'Hot, warm' are complete; the next line '-ales …' starts a new headword.
    if len(g) <= 48 and g.count(",") <= 2 and g and g[0].isupper() and not g.startswith("-"):
        return False
    return True


def _is_spurious_stem_o_repeat_line(prev: str, p: str) -> bool:
    """OCR repeats '-o' / '-o,(G).' under aleth/alet/aleur; keep in the same cell."""
    if not re.search(r"ale(th|t|ur)", prev, re.I):
        return False
    ps = p.strip().replace(" ", "")
    return bool(re.match(r"^-o,?(\([GL][a-z]*\)\.)?$", ps, re.I))


def _should_merge_incomplete_gloss_line(prev: str, p: str) -> bool:
    """Merge '«urnGrinding' / 'True,' / '(G). Flour,' onto an entry whose gloss still continues."""
    ps = p.strip()
    if not ps or HAS_LANG_DOT.search(ps):
        return False
    if _starts_hyphen_subentry_line(p):
        return False
    if _is_roots_only_comma_line(p):
        return False
    return _gloss_incomplete_for_continuation(prev)


def _starts_new_fragment_roots_comma_after_closed_gloss(prev: str, p: str) -> bool:
    """Start a new fragment at 'aleur,' after '-ales (the ending …)' (previous ends with ')')."""
    if not _is_roots_only_comma_line(p):
        return False
    prev = prev.rstrip()
    return prev.endswith(")")


def _is_roots_comma_chain(prev: str, nxt: str) -> bool:
    """Merge 'aleur,' + 'alet,' + 'aleth,-o(G).' into one cell before parsing."""
    if not prev.rstrip().endswith(","):
        return False
    s = nxt.strip()
    if not s or s.startswith("-"):
        return False
    if _is_roots_only_comma_line(nxt):
        return True
    # Next line continues the comma-separated stem block (e.g. 'aleth,-o(G).').
    return bool(re.match(r"^[a-zA-Z]", s))


def _is_stem_continuation_fragment(prev: str, nxt: str) -> bool:
    """
    OCR often splits comma-separated roots across columns or lines: 'achyr,' then '-o, =um (G).'
    The second piece starts with a hyphen stem, '=', or ', -' / ', =' — not a new English gloss line.
    """
    if not prev.rstrip().endswith(","):
        return False
    s = nxt.strip()
    if not s:
        return False
    if s.startswith("-") or s.startswith("="):
        return True
    if re.match(r"^,\s*[-=]", s):
        return True
    return False


def _should_merge_orphan_continuation(left_frag: str, orphan: str) -> bool:
    """
    When the right column has a line with no '(LANG).' (e.g. 'gift'), it may continue the
    previous line's left-column entry if the gutter was wide enough to split columns but the
    gloss wrapped without a tag (Borror two-column layout).
    """
    o = orphan.strip()
    if not o or len(o) > 120:
        return False
    if "(" in o or ")" in o:
        return False
    if not HAS_LANG_DOT.search(left_frag):
        return False
    m = LANG_DOT_RE.search(left_frag)
    if not m:
        return False
    meaning = left_frag[m.end() :].strip()
    return bool(re.search(r"[;,]\s*a\s*$", meaning))


def _append_right_or_merge_to_left(left_frags: list[str], right_frags: list[str], piece: str) -> None:
    p = piece.strip()
    if not p:
        return
    if not HAS_LANG_DOT.search(p):
        for i in range(len(left_frags) - 1, -1, -1):
            if _should_merge_orphan_continuation(left_frags[i], p):
                left_frags[i] = left_frags[i].rstrip() + " " + p
                return
    right_frags.append(piece)


def merge_column_fragments(parts: list[str]) -> list[str]:
    """
    Join layout lines where a gloss continues on the next line without a new (LANG). tag.
    pdftotext splits long glosses across rows; the continuation line has no parenthetical tag.
    Also join '-o, =um (G).' to a previous fragment that ends with 'stem,' (split roots).
    Start a new fragment before '-ales …' after a short (G). gloss, and before 'aleur,' after '-ales …)'.
    """
    out: list[str] = []
    for p in parts:
        p = p.strip()
        if not p:
            continue
        if out and _is_roots_comma_chain(out[-1], p):
            out[-1] = out[-1].rstrip() + " " + p
        elif out and _is_stem_continuation_fragment(out[-1], p):
            out[-1] = out[-1].rstrip() + " " + p
        elif out and _is_spurious_stem_o_repeat_line(out[-1], p):
            out[-1] = out[-1].rstrip() + " " + p
        elif out and _should_merge_incomplete_gloss_line(out[-1], p):
            out[-1] = out[-1].rstrip() + " " + p
        elif out and _starts_new_fragment_hyphen_after_short_gloss(out[-1], p):
            out.append(p)
        elif out and _starts_new_fragment_roots_comma_after_closed_gloss(out[-1], p):
            out.append(p)
        elif HAS_LANG_DOT.search(p):
            out.append(p)
        elif out:
            out[-1] = out[-1].rstrip() + " " + p
        else:
            out.append(p)
    return out


def roots_has_embedded_lang_tag(roots: str) -> bool:
    """True if OCR merged two headwords — roots should not contain a second '(LANG).' gloss tag."""
    return bool(re.search(r"\s\([A-Z][a-z]{0,14}\)\.\s", roots))


def roots_is_concat_fragment(roots: str) -> bool:
    """Reject bogus headwords produced by bad splits (bare «/= + one letter, etc.)."""
    r = roots.strip()
    if r in {"-o,", "-o", "«a", "«o", "«s", "«e", "«i", "=a", "=o", "=s", "=e", "=i"}:
        return True
    if re.fullmatch(r"«[a-zA-Z]{1,2}", r):
        return True
    if re.fullmatch(r"=[a-zA-Z]{1,2}", r):
        return True
    return False


def _try_split_aleur_alet_aleth_ocr_blob(seg: str) -> list[dict] | None:
    """
    pdftotext merges the aleur / alet / aleth block into one cell with duplicated '-o' lines.
    Split into three book entries when the OCR tail matches this page's pattern.
    Glosses match the printed book (1960); 'Flour, meal' is not always present in OCR.
    """
    s = seg.strip()
    if "aleur," not in s or "alet," not in s or "aleth" not in s:
        return None
    if not re.search(r"aleth,\s*-o\s*\(G\)\.", s, re.I):
        return None
    if not re.search(r"urnGrind|Grinding\s*True", s, re.I):
        return None
    return [
        {"roots": "alet, -o", "langCode": "G", "meaning": "Grinding"},
        {"roots": "aleth, -o", "langCode": "G", "meaning": "True, honest"},
        {"roots": "aleur, -o =um", "langCode": "G", "meaning": "Flour, meal"},
    ]


def _parse_standalone_hyphen_entry(seg: str) -> list[dict] | None:
    """Headwords like '-ales (the ending of plant order names)' with no language tag in OCR."""
    seg = seg.strip()
    m = re.match(r"^(-[a-zA-Z][a-zA-Z0-9,=\-]*)\s+(\([^)]+\))\s*(.*)$", seg)
    if not m:
        return None
    roots, gloss_paren, rest = m.group(1), m.group(2), m.group(3).strip()
    meaning = gloss_paren.strip("()").strip()
    row: dict = {"roots": roots, "langCode": "G", "meaning": meaning}
    if not rest:
        return [row]
    return [row] + parse_segment(rest)


def parse_segment(seg: str) -> list[dict]:
    """Parse one layout cell; may return multiple dicts when several headwords share one OCR blob."""
    seg = seg.strip()
    if not seg:
        return []
    seg = fix_ocr_typos(seg)
    ale_split = _try_split_aleur_alet_aleth_ocr_blob(seg)
    if ale_split is not None:
        return ale_split

    matches = list(LANG_DOT_RE.finditer(seg))
    if not matches:
        return _parse_standalone_hyphen_entry(seg) or []

    m0 = matches[0]
    roots_raw = seg[: m0.start()].strip()
    lang = re.sub(r"\s+", " ", m0.group(1).strip())
    salvaged = salvage_roots(roots_raw)
    if salvaged is None or roots_has_embedded_lang_tag(salvaged) or roots_is_concat_fragment(salvaged):
        return []

    if len(matches) >= 2:
        m1 = matches[1]
        gap = seg[m0.end() : m1.start()]
        sp = _split_gap_between_entries(gap)
        if sp is not None:
            meaning, roots_next = sp
            idx = seg.find(roots_next, m0.end(), m1.start() + 1)
            if idx < 0:
                idx = seg.rfind(roots_next, m0.end(), m1.start() + 1)
            if idx >= 0:
                rest = seg[idx:]
                row: dict = {"roots": salvaged, "langCode": lang, "meaning": meaning.strip()}
                return [row] + parse_segment(rest)

    meaning = seg[m0.end() :].strip()
    meaning, tail = split_concatenated_meaning(meaning)
    if not meaning and tail:
        return parse_segment(tail)
    row = {"roots": salvaged, "langCode": lang, "meaning": meaning}
    out: list[dict] = [row]
    if tail:
        out.extend(parse_segment(tail))
    return out


def _append_parsed_entries(entries: list[dict], seg: str) -> None:
    for row in parse_segment(seg):
        if roots_is_concat_fragment(row["roots"]):
            continue
        row["rawSegment"] = seg[:500]
        entries.append(row)


def extract_dictionary(raw_text: str) -> list[dict]:
    """All dictionary pages: left column then right column per page, with wrapped gloss lines merged."""
    entries: list[dict] = []
    left_carry: str | None = None
    right_carry: str | None = None
    page_list = list(pages_for_dictionary_entries(raw_text))
    for page_idx, page_lines in enumerate(page_list):
        is_last_page = page_idx == len(page_list) - 1
        left_frags: list[str] = []
        right_frags: list[str] = []
        # Carry must be available before the first line so stem fragments (e.g. '-o, =um') merge.
        if left_carry:
            left_frags.append(left_carry)
        if right_carry:
            right_frags.append(right_carry)
        for line in page_lines:
            if should_skip_layout_line(line):
                continue
            left, right = line_left_right(line)
            if left:
                left_frags.extend(split_jammed_two_entries(left))
            if right:
                for piece in split_jammed_two_entries(right):
                    ps = piece.strip()
                    if (
                        left_frags
                        and ps
                        and _is_stem_continuation_fragment(left_frags[-1], ps)
                    ):
                        left_frags[-1] = left_frags[-1].rstrip() + " " + ps
                    else:
                        _append_right_or_merge_to_left(left_frags, right_frags, piece)
        left_merged = merge_column_fragments(left_frags)
        right_merged = merge_column_fragments(right_frags)

        def process_column(merged: list[str]) -> str | None:
            if not merged:
                return None
            if not is_last_page and merged[-1].rstrip().endswith(","):
                for seg in merged[:-1]:
                    _append_parsed_entries(entries, seg)
                return merged[-1]
            for seg in merged:
                _append_parsed_entries(entries, seg)
            return None

        left_carry = process_column(left_merged)
        right_carry = process_column(right_merged)

    for tail in (left_carry, right_carry):
        if tail:
            _append_parsed_entries(entries, tail)

    return entries


# Optional roots-level fixes when OCR still disagrees with the book after fix_ocr_typos («→=).
OCR_EQUALS_ROOT_FIXES: dict[str, str] = {}


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    pdf = root / "web" / "public" / "dictionary_of_word_roots_and_combining_forms_borror.pdf"
    out_json = root / "web" / "public" / "dictionary.json"
    if len(sys.argv) > 1:
        pdf = Path(sys.argv[1])

    text = pdftotext_layout(pdf)
    entries = extract_dictionary(text)
    for e in entries:
        e["roots"] = OCR_EQUALS_ROOT_FIXES.get(e["roots"], e["roots"])
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
