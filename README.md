# word_roots

A web application that helps you invent **scientific names** (for example, species epithets or compound names) by turning a **plain-language description** of the organism into suggested **Latin and Greek combining forms**, then assembling them into coherent candidates.

The goal is to support the same audience Borror had in mind—students, clinicians, and especially **taxonomists** who need to coin names that follow conventional patterns for word formation.

## Source material

The project is built around *Dictionary of Word Roots and Combining Forms* by **Donald J. Borror** (Mayfield Publishing Company; first edition 1960), compiled from Greek, Latin, and other languages with emphasis on biological terminology and scientific naming.

A PDF of that dictionary is included in this repository as the working source for analysis and tooling:

- `dictionary_of_word_roots_and_combining_forms_borror.pdf`

The printed book also contains sections on **formulation of scientific names**, **transliteration of Greek words**, and **common combining forms**—those sections will inform how the app validates and combines roots.

## Web app (current)

The **`web/`** package is a client-side app that loads structured entries from `web/public/dictionary.json`.

- **Search + letter row** — One view: search box and A–Z (and `#`) buttons. With an empty search, pick a letter to list entries for that headword letter (book order within the letter). With text in the search box, up to 200 matches are shown across all letters; choose a letter to clear the search and jump to that letter.
- **Name builder** — Enter a short English phrase (e.g. “an unapproachable eagle”). The app matches the first two content words to dictionary glosses, then joins the stems using Greek/Latin combining rules from Borror’s *Formulation of Scientific Names* (e.g. omitting the Greek linking vowel before a vowel-initial second root). Output is a draft epithet / genus-style stem; real names still need correct grammatical endings and availability checks.
- **Entry cards** — Show Borror’s root line, expand abbreviations such as `(G)` / `(L)` into full language names, and add short natural-language notes for notation (connecting vowels after commas, `=`, leading hyphen, etc.).

### Requirements

- **Node.js** (for `npm` in `web/`).
- **pdftotext** from [Poppler](https://poppler.freedesktop.org/) (e.g. `poppler-utils` on Debian) to regenerate the JSON from the PDF.

### Commands

```bash
# Regenerate dictionary JSON from the PDF (run from repo root)
python3 scripts/extract_dictionary.py

# Develop
cd web && npm install && npm run dev

# Production build
cd web && npm run build
```

Serve `web/dist/` with any static file server for production.

## Roadmap

1. **Richer search** — Synonyms, stemming, or embeddings for English descriptions (beyond substring search).
2. **Name builder** — Suggest compounds from chosen roots with basic Latin/Greek linking rules.
3. **Cleaner extraction** — Improve wrapped lines and OCR glitches in the PDF-derived data.

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE) (GPL-3.0).
