# OCR cleanup — manual review queue

Automated passes added **`ocr_entry_overrides.json`**, **`_clean_meaning_column_bleed`**, **`_polish_meaning_gloss_chars`**, **`SPURIOUS_ROOTS`**, and expanded **`ocr_root_fixes.json`**. **`dictionary.json`** should have **no empty glosses** and no **`#`** hash artifacts in meanings.

## Still worth eyeballing in the printed book

1. **Vertical two-column shredders** — A few pages (e.g. **cnid–cnic**, **momot**, **mesit/lexi**, **torcul/top**) were severely split in the PDF text layer. We repaired many rows via overrides or drops; a residual odd **`rawSegment`** may remain for audit.

2. **Duplicate `roots` strings** — Nine roots appear twice with **different `langCode`** or senses (e.g. **=acus** L vs G, **ana** G vs L, **tax, -o, =us** G vs NL). These are often **legitimate homographs** in Borror; do not dedupe without checking the book.

3. **Override-based glosses** — Entries filled only after inference (e.g. **maring,** “Of Mary”, **pano** “Panic grass; panicle”, **lexi** “A word; speech”, **mesit** “Middle; a mediator”, **orneo** “A bird”) should be checked against the 1960 page.

4. **Tesseract cross-checks** — Where we used page snapshots (e.g. **aegr** block), spot-check against your copy.

5. **Remaining stumps** — None flagged automatically after the last pass. If you find a bad line, add an exact **`roots`** key to **`ocr_root_fixes.json`** or a rule to **`ocr_entry_overrides.json`** and regenerate.
