#!/usr/bin/env python3
"""
Flag adjacent pairs within each browse-letter bucket where roots sort keys decrease
(lexicographic, same rule as `browseLetter` in the web app).

Borror’s book lists roots alphabetically within each letter; **book column order** in
`dictionary.json` follows PDF extraction (left column then right column per page). When
`pdftotext` mis-assigns a line to the wrong column (narrow gutter, odd leading spaces), two
headwords can appear **out of alphabetical order** even though the printed page order is
correct—**e.g. caball above cacatu in the book but cacatu emitted before caball** because
one line was parsed as left-column and the other as right-column.

This script does **not** modify data; it only prints warnings for manual review / extractor fixes.
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
    path = Path(__file__).resolve().parents[1] / "web" / "public" / "dictionary.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    entries: list[dict] = data["entries"]

    buckets: dict[str, list[dict]] = {}
    for e in entries:
        L = mod.browse_letter_bucket(e["roots"])
        buckets.setdefault(L, []).append(e)

    letters = sorted(buckets.keys(), key=lambda x: (x == "#", x))
    total = 0
    for L in letters:
        xs = buckets[L]
        for i in range(len(xs) - 1):
            a = mod.roots_sort_key(xs[i]["roots"])
            b = mod.roots_sort_key(xs[i + 1]["roots"])
            if a > b:
                total += 1
                print(
                    f"{L}: id {xs[i]['id']} {xs[i]['roots'][:60]!r}  >  "
                    f"id {xs[i+1]['id']} {xs[i+1]['roots'][:60]!r}",
                    file=sys.stderr,
                )
    if total == 0:
        print("No alphabetical inversions within browse-letter buckets.", file=sys.stderr)
    else:
        print(f"Total adjacent inversions: {total}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
