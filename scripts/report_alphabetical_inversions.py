#!/usr/bin/env python3
"""
Write all adjacent alphabetical inversions within each browse-letter bucket to a text report.

Use after `extract_dictionary.py` to review rows where **book column order** disagrees with
strict lexicographic order on the roots line — often column glue, OCR junk, or (rarely) valid
Borror ordering quirks. Does not modify `dictionary.json`.
"""

from __future__ import annotations

import argparse
import importlib.util
import json
from collections import defaultdict
from pathlib import Path


def _load_extract():
    p = Path(__file__).resolve().parent / "extract_dictionary.py"
    spec = importlib.util.spec_from_file_location("extract_dictionary", p)
    mod = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(mod)
    return mod


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "-o",
        "--output",
        type=Path,
        help="Write report to this file (UTF-8); default: stdout",
    )
    args = ap.parse_args()

    mod = _load_extract()
    path = Path(__file__).resolve().parents[1] / "web" / "public" / "dictionary.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    entries: list[dict] = data["entries"]

    buckets: dict[str, list[dict]] = defaultdict(list)
    for e in entries:
        L = mod.browse_letter_bucket(e["roots"])
        buckets[L].append(e)

    lines: list[str] = []
    letters = sorted(buckets.keys(), key=lambda x: (x == "#", x))
    total = 0
    for L in letters:
        xs = buckets[L]
        for i in range(len(xs) - 1):
            if mod.first_stem_key(xs[i]["roots"]) == mod.first_stem_key(xs[i + 1]["roots"]):
                continue
            a = mod.roots_sort_key(xs[i]["roots"])
            b = mod.roots_sort_key(xs[i + 1]["roots"])
            if a > b:
                total += 1
                e1, e2 = xs[i], xs[i + 1]
                lines.append(
                    f"{L}\t{e1['id']}\t{e2['id']}\t{e1['roots'][:72]!r}\t>\t{e2['roots'][:72]!r}\t"
                    f"{e1['meaning'][:40]!r} | {e2['meaning'][:40]!r}"
                )

    header = (
        f"# Alphabetical inversions within browse-letter buckets (n={total})\n"
        f"# dictionary.json order={data.get('order')} entryCount={data.get('entryCount')}\n"
        f"# Columns: letter  id_left  id_right  roots_left  >  roots_right  meaning_snippets\n"
    )
    text = header + "\n".join(lines) + "\n"

    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(text, encoding="utf-8")
    else:
        print(text, end="")


if __name__ == "__main__":
    main()
