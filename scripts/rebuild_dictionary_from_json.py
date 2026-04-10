#!/usr/bin/env python3
"""
Re-apply SPURIOUS filtering, entry overrides, and de-dupe to `web/public/dictionary.json`
without re-running PDF extraction. Preserves **book column order** (the sequence of entries
in the file).
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
    mod = _load_extract()
    root = Path(__file__).resolve().parents[1]
    out_json = root / "web" / "public" / "dictionary.json"
    script_dir = Path(__file__).resolve().parent

    data = json.loads(out_json.read_text(encoding="utf-8"))
    entries: list[dict] = data["entries"]

    overrides = mod._load_ocr_entry_overrides(script_dir)
    mod._apply_entry_overrides(entries, overrides)
    for e in entries:
        e["langCode"] = mod._repair_broken_langcode(e.get("langCode", ""))
        if e.get("meaning") is not None:
            e["meaning"] = mod._clean_meaning_column_bleed(e["meaning"])

    entries = [e for e in entries if e["roots"] not in mod.SPURIOUS_ROOTS]
    inv_excl = mod._load_spurious_alphabetical_inversion_entries(script_dir)
    if inv_excl:
        entries = [
            e
            for e in entries
            if (e["roots"], e["langCode"], e.get("meaning", "")) not in inv_excl
        ]
    seen: set[tuple[str, str, str]] = set()
    unique: list[dict] = []
    for e in entries:
        key = (e["roots"], e["langCode"], e["meaning"])
        if key in seen:
            continue
        seen.add(key)
        unique.append(e)

    for i, e in enumerate(unique):
        e["id"] = i

    data["entries"] = unique
    data["entryCount"] = len(unique)
    data["order"] = "book-columns"
    out_json.write_text(json.dumps(data, ensure_ascii=False, indent=0), encoding="utf-8")
    print(f"Wrote {len(unique)} entries to {out_json}", file=sys.stderr)


if __name__ == "__main__":
    main()
