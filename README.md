# word_roots

Browser-based tools built around **Donald J. Borror’s** *Dictionary of Word Roots and Combining Forms*: a **searchable index** of extracted entries, a **species-name / compound builder** from plain English, and an **in-app link to the original PDF** for full text and Borror’s introductory chapters.

The audience matches Borror’s—students, clinicians, and especially **taxonomists** who need conventional Latin and Greek combining forms when coining names.

## Source material

The underlying work is *Dictionary of Word Roots and Combining Forms* (first edition **1960**), **Donald J. Borror**, Mayfield Publishing Company: Greek, Latin, and other languages with emphasis on biological terminology and scientific naming.

The bundled PDF used for extraction and in the web UI lives at:

- `web/public/dictionary_of_word_roots_and_combining_forms_borror.pdf`

The printed book also contains sections on **formulation of scientific names**, **transliteration of Greek**, and **common combining forms**. Those sections are not duplicated in the app; open the PDF for the full treatment.

## Web app (`web/`)

A **static client-side** app (Vite + React + TypeScript). At runtime it loads **`web/public/dictionary.json`** only; there is no server API.

### Features

- **Search + letter row** — One screen: a search box and **A–Z** (plus **`#`**) buttons. With an **empty** search, choose a letter to list entries whose headword starts with that letter (**book order** within the letter: each PDF page is read **left column then right column**). With **text in the search box**, up to **200** substring matches are shown across all letters; picking a letter clears the search and jumps to that letter’s browse list.
- **Name builder** — Enter a short phrase (e.g. “unapproachable eagle”). **Stopwords** (articles, “and”, etc.) are dropped; the **first two content words** are matched to dictionary glosses, then stems are joined with simplified rules from Borror’s *Formulation of Scientific Names* (Greek **ο** linking and omission before a vowel-initial second stem, **o**+**o** elision where applicable, Latin **i** link when mixing Greek and Latin with a warning). Output is a **draft** lowercase epithet and a **genus-style** capitalized stem; real names still need correct endings, grammar, and nomenclatural availability checks. A **gloss-based note** suggests when your English order may invert Borror’s usual “quality before principal” pattern.
- **Entry cards** — Show the root line, expand tags like `(G)` / `(L)` into full language names, and short notes on notation (commas, `=`, leading hyphens, etc.).
- **Source book** — The UI includes attribution and a button to **open the Borror PDF** in a new tab (same file as in `web/public/`).

### Requirements

- **Node.js** (for `npm` in `web/`).
- **pdftotext** from [Poppler](https://poppler.freedesktop.org/) (e.g. `poppler-utils` on Debian) to regenerate `dictionary.json` from the PDF.

### Commands

```bash
# Regenerate dictionary JSON from the bundled PDF (run from repo root)
python3 scripts/extract_dictionary.py

# Develop
cd web && npm install && npm run dev

# Production build
cd web && npm run build
```

Serve `web/dist/` with any static file server for production.

## Roadmap

1. **Richer search** — Synonyms, stemming, or embeddings for English descriptions (beyond substring search).
2. **Cleaner extraction** — Improve wrapped lines and OCR glitches in the PDF-derived data.

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE) (GPL-3.0).
