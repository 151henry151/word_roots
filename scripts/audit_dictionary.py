#!/usr/bin/env python3
"""Report likely OCR / extraction issues in web/public/dictionary.json (read-only)."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    path = root / "web" / "public" / "dictionary.json"
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    if args:
        path = Path(args[0])
    data = json.loads(path.read_text(encoding="utf-8"))
    entries = data.get("entries", [])

    comma_end = [e for e in entries if e.get("meaning", "").rstrip().endswith(",")]
    multi_lang = [
        e
        for e in entries
        if len(re.findall(r"\([GL][a-z]{0,3}\)\.", e.get("meaning", ""))) > 1
    ]
    roots_parens = [e for e in entries if re.search(r"\([GL]\)", e.get("roots", ""))]

    print(f"File: {path}")
    print(f"Entries: {len(entries)}")
    print(f"Meaning ends with comma: {len(comma_end)}")
    print(f"Meaning has 2+ (G)./(L). fragments: {len(multi_lang)}")
    print(f"Roots field contains (G)/(L): {len(roots_parens)}")

    if "--verbose" in sys.argv or "-v" in sys.argv:
        print("\n--- comma endings (roots) ---")
        for e in comma_end[:80]:
            print(e.get("roots", "")[:60])
        if len(comma_end) > 80:
            print(f"... ({len(comma_end) - 80} more)")


if __name__ == "__main__":
    main()
