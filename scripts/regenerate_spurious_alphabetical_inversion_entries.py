#!/usr/bin/env python3
"""
Rebuild `spurious_alphabetical_inversion_entries.json` from a full PDF extract with **no**
inversion-based row drops (same preprocessing as `extract_dictionary.main()` up to that step).

Run from the repo root or `scripts/`; requires `pdftotext` and the Borror PDF in `web/public/`.
"""

from __future__ import annotations

import importlib.util
import json
import sys
from pathlib import Path


def _load_extract():
    p = Path(__file__).resolve().parent / "extract_dictionary.py"
    spec = importlib.util.spec_from_file_location("extract_dictionary", p)
    mod = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(mod)
    return mod


def main() -> None:
    script_dir = Path(__file__).resolve().parent
    root = script_dir.parent
    mod = _load_extract()
    pdf = root / "web" / "public" / "dictionary_of_word_roots_and_combining_forms_borror.pdf"
    ocr_root_fixes = mod._load_ocr_root_fixes(script_dir)
    text = mod.pdftotext_layout(pdf)
    entries = mod.extract_dictionary(text)
    for e in entries:
        e["roots"] = ocr_root_fixes.get(e["roots"], e["roots"])
        e["roots"] = mod._normalize_roots_whitespace(e["roots"])
    overrides = mod._load_ocr_entry_overrides(script_dir)
    mod._apply_entry_overrides(entries, overrides)
    for e in entries:
        e["langCode"] = mod._repair_broken_langcode(e.get("langCode", ""))
        if e.get("meaning") is not None:
            e["meaning"] = mod._clean_meaning_column_bleed(e["meaning"])

    entries = [e for e in entries if e["roots"] not in mod.SPURIOUS_ROOTS]
    seen: set[tuple[str, str, str]] = set()
    unique: list[dict] = []
    for e in entries:
        key = (e["roots"], e["langCode"], e.get("meaning", ""))
        if key in seen:
            continue
        seen.add(key)
        unique.append(e)

    drops = mod.compute_spurious_alphabetical_inversion_drops(unique)
    out = script_dir / "spurious_alphabetical_inversion_entries.json"
    out.write_text(json.dumps(drops, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(drops)} rows to {out}", file=sys.stderr)


if __name__ == "__main__":
    main()
