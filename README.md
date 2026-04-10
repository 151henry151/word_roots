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
- **Name builder** — Enter a short phrase (e.g. “sea eagle” for a short field-note gloss). **Stopwords** (articles, “and”, etc.) are dropped; each remaining content word (up to a fixed cap) is matched to dictionary glosses, then stems are **chained left-to-right** with simplified rules from Borror’s *Formulation of Scientific Names* (Greek **ο** linking and omission before a vowel-initial next stem, **o**+**o** elision where applicable, Latin **i** link when a link step is not Greek–Greek). Output is a **draft** lowercase epithet and a **genus-style** capitalized stem; real names still need correct endings, grammar, and nomenclatural availability checks. **Gloss-based notes** compare the first and last words (or the two words when there are only two) for Borror’s usual “quality before principal” pattern.
- **Entry cards** — Show the root line, expand tags like `(G)` / `(L)` into full language names, and short notes on notation (commas, `=`, leading hyphens, etc.).
- **Source book** — The top of the page states what the app indexes, with **Open book PDF** (same file as `web/public/…`) on the next line. An **Introduction** panel (collapsed by default) contains Borror’s preface and *How to use this dictionary* in full (extracted from the PDF). The **compound name builder** sits below that so the dictionary search stays primary.

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

The extractor merges wrapped gloss lines in each column (continuation rows without a new `(LANG).` tag) and can carry an incomplete trailing line across page breaks when the gloss still ends with a comma. When **two headwords** appear in one OCR fragment (the column gutter was only 2–3 spaces, so the wide-space column split missed), it **splits on repeated `roots (LANG).` patterns**, and when a second headword is **jammed onto the same line** after the first gloss (e.g. `=depas` / `=diazoma`), it **splits on `roots (LANG).` inside the English**. OCR reads Borror’s **`=`** as **`«`** in places; the extractor **normalizes `«` to `=`** everywhere. **`OCR_EQUALS_ROOT_FIXES`** is reserved for any remaining roots-level overrides after that (usually empty).

Serve `web/dist/` with any static file server for production.

**Subpath hosting** — Production builds for `https://hromp.com/word_roots/` use `web/.env.production` with `VITE_BASE=/word_roots/` so JS, CSS, `dictionary.json`, and the PDF resolve under that path. For hosting at the site root, set `VITE_BASE=/` (or remove the variable) before `npm run build`.

## Roadmap

1. **Richer search** — Synonyms, stemming, or embeddings for English descriptions (beyond substring search).
2. **Cleaner extraction** — Improve wrapped lines and OCR glitches in the PDF-derived data.

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE) (GPL-3.0).
