# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
