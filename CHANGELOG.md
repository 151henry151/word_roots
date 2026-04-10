# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.39] - 2026-04-09

### Changed

- Replace violet and warm-gray **Tailwind** accents in the **web** UI with a black background, white/neutral text, and neutral borders ( **`App`**, **`EntryCard`**, **`NameBuilder`**, **`CollapsibleBookSection`**, **`AppendixCollapsibles`**, **`index.css`** ).

## [0.1.38] - 2026-04-10

### Changed

- Add a **GitHub** link to the **`App`** footer (repository source).

## [0.1.37] - 2026-04-10

### Added

- **`scripts/ocr_entry_overrides.json`** for targeted **`roots`** / **`meaning`** / **`langCode`** fixes; **`ocr_manual_review_queue.md`** for remaining human checks.
- **`_clean_meaning_column_bleed`**, **`_polish_meaning_gloss_chars`**, **`_normalize_roots_whitespace`**, **`_repair_broken_langcode`** in **`scripts/extract_dictionary.py`**.

### Changed

- Expand **`SPURIOUS_ROOTS`** and **`ocr_root_fixes.json`**; fix **`replie`**, **`top, -o, =us, =y`**, **`orneo`**, **`lexi`**, **`mesit`**, **`pselli`**, digit OCR (**`-11`→`-ll`**, etc.); drop **`n`**, **`A`**, **`The`**, **`tor,`** fragment rows; regenerate **`dictionary.json`** (fewer entries; no empty glosses).

## [0.1.36] - 2026-04-10

### Added

- **`_try_split_aegr_aelur_ocr_blob`** in **`scripts/extract_dictionary.py`** for the shredded **aegr / aegypt / … / aell** right column; document in **`scripts/e_prefix_spurious_audit.md`**.

### Changed

- Map **`aem, -a, -ato, -o`** → **`haem, =a, -ato, -o`** and **`-ato, aeno`** → **`aeno`** in **`scripts/ocr_root_fixes.json`**; strip **`aell`** bleed from the **addict** line in **`fix_ocr_typos`**; drop **`-a, -o,-o`** via **`SPURIOUS_ROOTS`**; regenerate **`dictionary.json`**.

## [0.1.35] - 2026-04-10

### Added

- Document FineReader **`c`→`e`** (and related) misreads in **`scripts/e_prefix_spurious_audit.md`**.

### Changed

- Extend **`scripts/ocr_root_fixes.json`** with **`earner`→`camera`**, **`earn`→`carn`**, **`eaten`→`caten`**, **`eau`→`caum`**, **`ere`→`cre`**, **`eras`→`cras`**; drop **`Egypt`**, **`-o A`**, **`elope`** via **`SPURIOUS_ROOTS`** in **`scripts/extract_dictionary.py`**; regenerate **`dictionary.json`**.
- Restore book-order letter browse in **`App`** and shorten the dictionary blurb.

## [0.1.34] - 2026-04-10

### Changed

- Clarify in **`App`** that letter browse groups by first character of the headword (not the printed section letter); sort letter buckets alphabetically by **`roots`** so short headwords like **`e`** are easy to find.

## [0.1.33] - 2026-04-10

### Changed

- Update the **`App`** header blurb to mention OCR errors in the transcription and keep the PDF as the authority.

## [0.1.32] - 2026-04-10

### Changed

- In **`scripts/extract_dictionary.py`**, normalize **`rigit` → `right`** in **`fix_ocr_typos`** (καιρός gloss).
- Treat gloss-area commas correctly: do not merge **`=cremaster`-style** right-column lines into left-column entries via stem-continuation or roots comma-chain heuristics; treat trailing commas after **`(G).`** / **`(L).`** as wrapped gloss so **`universe`** continues **`cosm, -o`**; regenerate **`dictionary.json`** (restore **`cosm, -o`** gloss and **`=cremaster`** as its own entry; drop bogus **`world, =cremaster`**).

## [0.1.31] - 2026-04-10

### Added

- Document OCR limitations in **`scripts/extract_dictionary.py`**; add **`scripts/ocr_root_fixes.json`** for exact **`roots`** string replacements after extraction (merged with optional inline **`OCR_EQUALS_ROOT_FIXES`**).

### Changed

- Apply initial **`ocr_root_fixes.json`** entries for **`men!` → `meni`**, **`mené` → `mene`**, **`mendie` → `mendic`**; regenerate **`dictionary.json`**.

## [0.1.30] - 2026-04-10

### Changed

- Replace the page footer with a link to **`https://hromp.com/`**.
- Load post-dictionary appendix text via **three dynamic imports** (`borrorFormulation`, `borrorTransliteration`, `borrorCombining`); update **`scripts/export_borror_appendix.py`** to emit those modules instead of one **`borrorAppendixSections.ts`** file.
- Add search **match total**, **showing N of total**, and **Show more** (in **`SEARCH_PAGE_SIZE`** rows) for dictionary search results.
- Bump **`word_roots-web`** to **0.1.30**.

## [0.1.29] - 2026-04-10

### Changed

- In **`scripts/extract_dictionary.py`**, map OCR **`»`** to **`=`** in **`fix_ocr_typos`** (with **`«`**, matching Borror’s equals sign for terminal stems); regenerate **`dictionary.json`**.

## [0.1.28] - 2026-04-10

### Changed

- In **`NameBuilder`**, expand Borror inline meaning tags **`(L):`** / **`(G):`** to full labels (e.g. **Greek (G):**) via **`expandInlineMeaningLangTags`** in **`langNames.ts`**.
- Bump **`word_roots-web`** to **0.1.28**.

## [0.1.27] - 2026-04-10

### Added

- Add collapsible **Formulation of scientific names**, **Transliteration of Greek words**, and **Some common combining forms** panels (text from the post-dictionary PDF pages via **`scripts/export_borror_appendix.py`**; Greek alphabet and transliteration rules transcribed in Unicode where the PDF text layer is unreliable).

### Changed

- Bump **`word_roots-web`** to **0.1.27**.

## [0.1.26] - 2026-04-10

### Changed

- In **`scripts/extract_dictionary.py`**, start new **left-column** fragments before **`-ales …`** (after a short **(G).** gloss) and before **`aleur,`** after a closing **`)`**; merge **`aleur,`/`alet,`** stem lines and spurious **`-o` / `-o,(G).`** OCR repeats; merge **incomplete** gloss continuations (e.g. **Grinding**); add a **book-aligned split** for the **aleur / alet / aleth** OCR blob; reject bogus **`-o`** / **`-o,`** roots; regenerate **`dictionary.json`**.

## [0.1.25] - 2026-04-10

### Changed

- In **`scripts/extract_dictionary.py`**, merge **stem continuations** across columns on the **same line** (e.g. **`achyr,`** + **`-o, =um (G).`**); apply **carries** from the previous page **before** reading lines so **`-o, =um`** can merge; add OCR spacing fixes for **`,-o(G).`** and glued **`(G).(G).`**; add **`scripts/audit_dictionary.py`** to count **`dictionary.json`** quality heuristics; regenerate **`dictionary.json`**.

## [0.1.24] - 2026-04-10

### Changed

- In **`scripts/extract_dictionary.py`**, split **narrow-gutter** lines that contain two **`(LANG).`** tags by locating the **second headword** in the gap before the next tag; split **two glosses in one meaning** when a single **`(LANG).`** remains (e.g. **drimy** / **drom**); skip false splits at **`, =us`** terminal stems; **merge** right-column lines without a language tag onto the **matching** left-column gloss (e.g. **gift** after **doro**); regenerate **`dictionary.json`**.

## [0.1.23] - 2026-04-10

### Changed

- In **`scripts/extract_dictionary.py`**, normalize OCR guillemet **`«`** to Borror’s **`=`** on all dictionary text; extend **concatenated-entry** splitting so a second headword like **`=diazoma, -to (G).`** after a single space is recognized; regenerate **`dictionary.json`** (e.g. separate **depas** and **diazoma**; terminal stems use **`=`** consistently).
- Document extractor behavior in **`README.md`**; simplify **`notation.ts`** (no **`«`** in roots after extraction).

## [0.1.22] - 2026-04-10

### Changed

- Split **jammed two-column lines** in **`extract_dictionary.py`** when one OCR fragment contains two `roots (LANG).` groups (narrow gutter); regenerate **`dictionary.json`** (e.g. **bracte** and **bubal** separated).
- Add **`OCR_EQUALS_ROOT_FIXES`** for **`=`** vs **`«`** on terminal stems where OCR matches the printed book (starting with **bracte** / **bubal**).

## [0.1.21] - 2026-04-10

### Changed

- In **`scripts/extract_dictionary.py`**, merge **wrapped gloss lines** in each column (rows without a new `(LANG).` tag) and **defer** a segment that still ends with a comma to the next page when needed; regenerate **`dictionary.json`** (fewer truncated glosses; entry count about **7023**). A small set of meanings may still end with a comma where OCR merged two columns.

## [0.1.20] - 2026-04-10

### Changed

- Correct **`aapt`** gloss in **`dictionary.json`** to **“Unapproachable, invincible”** (PDF line wrap had split the English across two layout lines).
- Omit the notation block on entries with **no** Borror-specific tips; drop the generic “parenthetical language tag” line for simple roots.
- Remove the **“How to read this entry”** heading; show **only** the bullet list when tips exist.

## [0.1.19] - 2026-04-10

### Changed

- Read Vite **`base`** from **`VITE_BASE`** in **`.env.production`** (default **`/`** so local **`npm run dev`** works at the site root without living under **`/word_roots/`**); keep **`VITE_BASE=/word_roots/`** for production builds aimed at hromp.

## [0.1.18] - 2026-04-10

### Changed

- Load **`dictionary.json`** and the Borror PDF using **`import.meta.env.BASE_URL`** so fetches resolve under **`/word_roots/`** when deployed on a subpath.

## [0.1.17] - 2026-04-10

### Changed

- Set Vite **`base`** to **`/word_roots/`** for production builds served at **`https://hromp.com/word_roots/`**.

## [0.1.16] - 2026-04-09

### Changed

- Set the compound name builder’s default example to **sea eagle** (two roots, draft epithet `haliaet` from sea + eagle glosses).

## [0.1.15] - 2026-04-09

### Changed

- Merge the preface and how-to collapsibles into a single **Introduction** section (`BORROR_INTRODUCTION`).

## [0.1.14] - 2026-04-09

### Changed

- Add a **Word Roots** title above the intro blurb, shrink the blurb type size, rephrase it as a tool for easier access to Borror’s book, and drop the sentence about automatic extraction from the PDF.

## [0.1.13] - 2026-04-09

### Added

- Add collapsible **Preface** and **How to use this dictionary** sections above the compound name builder, with full text from Borror (1960) bundled in `web/src/content/borrorBookSections.ts`.

## [0.1.12] - 2026-04-09

### Changed

- Set the compound name builder’s default example phrase to “small bright forest beetle” (field-note style description and a coherent draft epithet from the matched roots).

## [0.1.11] - 2026-04-09

### Changed

- Chain **more than two roots** in the compound name builder: match every content word (up to 12) and combine stems left-to-right with the same pairwise formulation rules; add word-order hints for two-word phrases versus first-and-last words when longer.

## [0.1.10] - 2026-04-09

### Changed

- Restructure the main layout: put the Borror attribution as the top-level header, place Open book PDF below it without a card, add a toggle for the compound name builder (collapsed by default), and move the dictionary usage blurb directly above the search field.

## [0.1.9] - 2026-04-09

### Added

- Add a “Source book” panel in the web app with citation text and a button to open the Borror PDF in a new tab.

### Changed

- Move the bundled PDF to `web/public/dictionary_of_word_roots_and_combining_forms_borror.pdf` so the dev server and production build serve it; point `scripts/extract_dictionary.py` at that path.
- Rewrite the root `README.md` to describe the web app features, data flow, and PDF location accurately.

## [0.1.8] - 2026-04-09

### Added

- Track `dictionary_of_word_roots_and_combining_forms_borror.pdf` at the repository root so the extractor and docs refer to a checked-in source file (superseded at **0.1.9** by the copy under `web/public/`).

## Initial setup (first push, 2026-04-09)

This section summarizes everything introduced before the first `git push` of the application stack. The numbered releases **0.1.0** through **0.1.7** below list the same work in development order; **web/package.json** is at **0.1.7**.

### Data pipeline

- Add **`scripts/extract_dictionary.py`**: run `pdftotext -layout` on Borror’s PDF, split on form feeds so each page keeps **left column then right column**, and write **`web/public/dictionary.json`** with headword, roots, language codes, and English gloss per entry.
- Refine extraction across patch releases: language-tag anchoring, salvage of semicolon-joined OCR junk, split merged headwords from glosses, reject invalid roots, concat-split rules so spurious combining forms are not headwords, book order instead of alphabetical sort, and tighter patterns for two-column jams.

### Web application (`web/`)

- Scaffold **Vite + React + TypeScript** with search (substring over meanings and roots), **A–Z + `#` browse** in book order, and **entry detail** with short “how to read this entry” notes and expanded Borror language abbreviations.
- Evolve the UI from separate search/browse tabs to a **single view**: search field plus letter row.
- Add **species name builder**: strip stopwords, use the first two content words, match glosses, combine stems with rules from *Formulation of Scientific Names* (Greek linking vowel behavior, **o**+**o** elision, simplified Latin **`i`** link with a note when Latin and Greek mix), and **gloss-based word-order hints** (warn when the phrase looks like principal-then-attribute, affirm attribute-then-principal, neutral otherwise).

### Repository layout

- Document usage and commands in **`README.md`**.
- Add **`.gitignore`** for `web/node_modules/`, `web/dist/`, and `.venv/`.

## [0.1.7] - 2026-04-09

### Changed

- Vary the name builder’s word-order note from dictionary glosses: warn when the phrase looks like principal-then-attribute, affirm when it looks like attribute-then-principal, and keep a neutral checklist otherwise.

## [0.1.6] - 2026-04-09

### Added

- Add species name builder: map the first two English content words to glosses, then combine stems with Borror’s formulation rules (Greek ο link or omission before a vowel-initial root, podo+odyn-style o elision when applicable; Latin uses a simplified `i` link).

## [0.1.5] - 2026-04-09

### Changed

- Combine search and letter browse into a single view: search field with A–Z letter buttons below; remove separate Search / Browse tabs.

## [0.1.4] - 2026-04-09

### Changed

- Order entries like the printed dictionary: on each PDF page, read the entire left column then the entire right column; split the raw `pdftotext` on form feeds so page boundaries are preserved (`splitlines` drops `\\f` and previously collapsed the whole book into one column pass).

## [0.1.3] - 2026-04-09

### Changed

- Stop sorting extracted entries alphabetically; preserve PDF layout order as `order: "book"` and keep that order in browse-by-letter lists (remove per-letter A–Z re-sort in the UI).
- Tighten concat-splitting so headwords cannot be bare `«a` / `«` + one letter (combining-form fragments); extend regex so a headword starts with a letter or `«` plus at least three letters.

## [0.1.2] - 2026-04-09

### Changed

- Fix false dictionary rows where a combining form such as `=a` was taken as its own headword (e.g. from `agel, =a (G). A herd`); require concat-split headwords to start with a letter or «, and split `stem, =variant (LANG).` when two columns are jammed without a wide gap.

## [0.1.1] - 2026-04-09

### Changed

- Tighten dictionary extraction: use the leftmost valid `(LANG).` tag, salvage semicolon-joined OCR junk, split a second headword merged into the English gloss, reject roots that contain a second language tag, and sort A–Z by letter then normalized headword so punctuation does not crowd the top of the list.

## [0.1.0] - 2026-04-09

### Added

- Add Vite + React + TypeScript web app with search and A–Z browse over extracted dictionary entries.
- Add `scripts/extract_dictionary.py` to build `web/public/dictionary.json` from the Borror PDF via `pdftotext -layout`.
- Add per-entry “How to read this entry” notes derived from Borror’s conventions and expanded language abbreviations.
