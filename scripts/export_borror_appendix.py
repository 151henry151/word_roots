#!/usr/bin/env python3
"""
Extract post-dictionary sections from the bundled Borror PDF (pdftotext -layout).

Page ranges (1-based) follow pdftotext output for this FineReader-sourced PDF:
  Formulation of Scientific Names     → pages 123–125
  Transliteration of Greek Words      → pages 126–127
  Some Common Combining Forms         → pages 128–144

The Greek alphabet and transliteration *tables* are not emitted reliably from the
PDF text layer; those are filled from manual Unicode transcription matching the book.
"""

from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / "web" / "public" / "dictionary_of_word_roots_and_combining_forms_borror.pdf"
CONTENT_DIR = ROOT / "web" / "src" / "content"
OUT_FORMUL = CONTENT_DIR / "borrorFormulation.ts"
OUT_TRANS = CONTENT_DIR / "borrorTransliteration.ts"
OUT_COMB = CONTENT_DIR / "borrorCombining.ts"

# 1-based inclusive page indices into split("\f")
FORM_PAGES = (123, 125)
TRANS_PAGE_PROSE = 126  # prose + bad alphabet — we replace tables below
COMB_PAGES = (128, 144)


def pdftotext_layout() -> str:
    return subprocess.check_output(
        ["pdftotext", "-layout", str(PDF), "-"],
        text=True,
        errors="replace",
    )


def join_pages(raw: str, start: int, end: int) -> str:
    """start/end are 1-based inclusive."""
    pages = raw.split("\f")
    return "\f".join(pages[start - 1 : end])


def clean_soft_hyphens(s: str) -> str:
    s = s.replace("\xad", "")
    s = s.replace("\ufeff", "")
    # Join syllable breaks that were soft-hyphenated
    s = re.sub(r"(\w)\s+\n\s*(\w)", r"\1\2", s)
    return s


def form_feeds_to_paragraphs(s: str) -> str:
    """pdftotext page breaks are \\f; keep them as blank lines so sections don't glue together."""
    s = s.replace("\f", "\n\n")
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s


def strip_formulation_noise(text: str) -> str:
    lines = []
    for ln in text.splitlines():
        t = ln.strip()
        if re.match(r"^1[12][0-9]$", t):
            continue
        if re.search(r"Word\s+R\s*o\s*o\s*t\s*s", ln) and "Combining" in ln:
            continue
        if re.match(r"^\s*F\s+o\s+r\s+m\s+u\s+l", ln):
            continue
        lines.append(ln)
    return "\n".join(lines)


def strip_combining_noise(text: str) -> str:
    lines = []
    for ln in text.splitlines():
        t = ln.strip()
        if re.search(r"Some Common Combining", ln) and re.search(r"\b11[89]\b|\b12[0-9]\b", t):
            continue
        if re.match(r"^1[12][0-9]\s+Word\s+", t):
            continue
        if re.search(r"Word\s+R\s*o\s*o\s*t\s*s\s+and\s+Combining", t):
            continue
        if re.match(r"^\s*S\s+o\s+m\s+e\s+C\s+o\s+m\s+m\s+o\s+n", ln):
            continue
        lines.append(ln)
    return "\n".join(lines)


def extract_transliteration_prose(raw: str) -> str:
    pages = raw.split("\f")
    pg = pages[TRANS_PAGE_PROSE - 1]
    # Through "as follows:" before the bad alphabet table
    m = re.search(
        r"(Transliteration of Greek Words\s+.*?as follows:)",
        pg,
        re.DOTALL | re.IGNORECASE,
    )
    if not m:
        sys.exit("Could not find transliteration prose start")
    return clean_soft_hyphens(m.group(1).strip())


# Manual tables: Unicode matches the 1960 Borror book layout; fixes PDF glyph mapping errors.
GREEK_ALPHABET_TABLE = """
  Α     α     alpha                         Ν     ν     nu
  Β     β     beta                          Ξ     ξ     xi
  Γ     γ     gamma                         Ο     ο     omicron
  Δ     δ     delta                         Π     π     pi
  Ε     ε     epsilon                       Ρ     ρ     rho
  Ζ     ζ     zêta                          Σ     σ, ς  sigma
  Η     η     eta                           Τ     τ     tau
  Θ     θ     theta                         Υ     υ     upsilon
  Ι     ι     iota                          Φ     φ     phi
  Κ     κ     kappa                         Χ     χ     chi
  Λ     λ     lambda                        Ψ     ψ     psi
  Μ     μ     mu                            Ω     ω     omega
""".strip()

# Two-column transliteration rules from the book (English glosses preserved from PDF where clear).
GREEK_TRANSLITERATION_RULES = """
α      a                              λ      l
ά      ha                             μ      m
ᾳ      ae (not a diphthong)           ν      n
αι     ai, ae, or e (preferably ae)   ξ      x
αυ     au                             ο      o (usually short)
β      b                              ό      ho (usually short)
γ      g                              οι     oe, oi, or e (preferably oe)
γγ     ng
γκ     nk
γξ     nx
γχ     nch                            final οι     on
δ      d                                final ον     um
ε      e (usually short)              ου     u or ou (preferably u)
έ      he (usually short)             medial ρ      r
ει     ei or i (preferably i)         initial ρ      rh
ευ     eu                            medial ρρ      rrh
ζ      z                              σ      s
η      e (usually long)               final ς      s
final η      a                       τ      t
θ      th                             never initial υ  y
ι      i                              initial υ      hy
ί      hi                             φ      ph
κ      c or k (preferably c)          χ      ch
ψ      ps
ω      o (usually long)
""".strip()


def main() -> None:
    raw = pdftotext_layout()
    formulation = clean_soft_hyphens(strip_formulation_noise(join_pages(raw, *FORM_PAGES)))
    formulation = form_feeds_to_paragraphs(formulation)
    # Same-page run-on between table and next paragraph in the PDF text layer
    formulation = formulation.replace("-inaeAnyone", "-inae\n\nAnyone")
    formulation = formulation.replace("-ia fornames", "-ia for names")
    formulation = re.sub(r"\n{3,}", "\n\n", formulation).strip()

    trans_prose = extract_transliteration_prose(raw)
    transliteration = (
        trans_prose
        + "\n\n"
        + GREEK_ALPHABET_TABLE
        + "\n\n"
        + "Greek letters should be transliterated as follows:\n\n"
        + GREEK_TRANSLITERATION_RULES
    )

    combining = clean_soft_hyphens(strip_combining_noise(join_pages(raw, *COMB_PAGES)))
    combining = form_feeds_to_paragraphs(combining)
    combining = re.sub(r"([a-z])(\d{3})([A-Z][a-z])", r"\1\n\2\n\n\3", combining)
    combining = re.sub(r"Suffixes(\d{3})", r"Suffixes\n\1", combining)
    combining = re.sub(r"\n{3,}", "\n\n", combining).strip()

    header = """/** Post-dictionary sections from Borror, *Dictionary of Word Roots and Combining Forms* (1960).\n * Generated by `scripts/export_borror_appendix.py` (pdftotext); Greek tables transcribed in Unicode.\n */\n\n"""

    def emit(name: str, doc: str, body: str) -> str:
        return f"/** {doc} */\nexport const {name} = {json.dumps(body, ensure_ascii=False)}\n"

    OUT_FORMUL.write_text(
        header
        + emit(
            "BORROR_FORMULATION_OF_SCIENTIFIC_NAMES",
            "Formulation of Scientific Names (after the dictionary listing).",
            formulation,
        ),
        encoding="utf-8",
    )
    OUT_TRANS.write_text(
        header
        + emit(
            "BORROR_TRANSLITERATION_OF_GREEK_WORDS",
            "Transliteration of Greek Words (alphabet and rules tables in Unicode).",
            transliteration,
        ),
        encoding="utf-8",
    )
    OUT_COMB.write_text(
        header
        + emit(
            "BORROR_SOME_COMMON_COMBINING_FORMS",
            "Some Common Combining Forms (lists by category).",
            combining,
        ),
        encoding="utf-8",
    )
    print(f"Wrote {OUT_FORMUL.name}, {OUT_TRANS.name}, {OUT_COMB.name}", file=sys.stderr)


if __name__ == "__main__":
    main()
