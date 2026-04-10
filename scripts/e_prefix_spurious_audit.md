# “E” headwords that appeared before the printed E section

Borror lists roots **alphabetically by headword** within each letter block. Anything in our extract whose `roots` starts with `e`/`E` but appears **before** the real **E** block (the page where **`e (L). Out, without, from`** begins) came from **elsewhere in the alphabet** in the book. For these nine cases, the PDF’s embedded text (ABBYY/FineReader) does **not** match the printed line: it is **misread** (usually **`c` read as `e`** in the **right column**), **column garbage** merged into a fake headword, or a **duplicate** of another line.

Evidence uses `pdftotext -layout` on `web/public/dictionary_of_word_roots_and_combining_forms_borror.pdf` (same layer our pipeline uses).

| roots in JSON | Verdict | What happened | Correction applied |
|---------------|---------|---------------|----------------------|
| `-o A` | Spurious | Shredded vertical OCR from the **aegr / aegypt / aene / … / aelur** block (printed p.~9); not a Borror headword. | **Drop** row. |
| `Egypt` | Spurious | Same blob; “Egypt” is a fragment of **aegypt** / **-ato, Egypt (G). bronze-colored** glued with storm/cat nonsense. | **Drop** row. |
| `earner, -a, -o` (L) “An arch; a chamber” | Misread | Right column on the **calci** line: FineReader read **`camera`** as **`earner`** (classic **`c`→`e`**, **`m`→`rn`**). Gloss matches Latin **camera** (vault / chamber). | **`ocr_root_fixes.json`**: → `camera, -ae, -o` |
| `earn, -eo, -i` (L) “Flesh” | Misread | Right column on the **caper** line; should be **`carn, -eo, -i`** (Latin **carō / carn-**, flesh). | → `carn, -eo, -i` |
| `eaten, =a, -ari` (L) “A chain” | Misread | Next to **cathedr** / **cat**- words; should be **`caten, =a, -ari`** (**catēna**, chain). | → `caten, =a, -ari` |
| `eau, -m, -s, -st, -t` (G) “Burn…” | Misread | Same spread as **carpin**; a few lines below the book has **`caum (G). Burn, burning`**. The **`eau`** line is **`caum`** misread. | → `caum, -m, -s, -st, -t` |
| `elope` (G) “Robbery, fraud” | Spurious / mis-line | On the **clavicul** row; the correct root for “rob, seize / robbery” in Borror appears elsewhere as **`harpac, -t`**, **`harpag, -i`**. **`elope`** does not match Greek roots for that gloss; treat as unusable duplicate of the **harp-** family until a scan confirms the exact printed string. | **Drop** row (see **`harpac, -t`**). |
| `ere, =as, -at, -o` (G) “Flesh, meat” | Misread | Same page block as **coryph** / **creo**; **`creo (G). Flesh, meat`** is the correct entry a few lines later. **`ere`** is **`cre-`** with a lost **`c`**. | → `cre, =as, -at, -o` |
| `eras, -i` (G) “Mix, blend” | Misread | Left column before **crocid**; FineReader **`c`→`e`**. Sense matches **κρᾶσις** / **cras-** type stems (mixing, blending). | → `cras, -i` |

After corrections, **no** legitimate Borror headwords starting with **`e`** should appear **above** the true **E** section in **book order**; browse-by-letter can stay in **book order** (not alphabetical within the tab).

---

## aegr / aelur shredded column (p.~18 of the PDF)

FineReader emitted one word per line in the right column after **aego**, then unrelated vertical junk (`-o A`, storm/cat text). **`_try_split_aegr_aelur_ocr_blob`** in **`extract_dictionary.py`** replaces that blob with six entries aligned to Tesseract on the page image and the column order in **`pdftotext -layout`**:

| roots | Lang | Gloss (in our JSON) |
|-------|------|---------------------|
| **aegr, -o** | L | Sick, diseased |
| **aegypt, =us** | L | Egypt |
| **aene** | L | Bronze; bronze-colored |
| **aem, -a, -ato, -o** → **haem, =a, -ato, -o** | G | Blood (merged with the existing **haem** row via dedupe) |
| **aelur, -o, =us** | G | A cat; tail-wagging |
| **aell, =a, -o** | G | A storm, whirlwind |

Spurious fragments **`-a, -o,-o`** are dropped; **`-ato, aeno`** is corrected to **`aeno`** (Terrible). The **addict** line had right-column bleed **`aell, =us`**; **`fix_ocr_typos`** strips that tail.
