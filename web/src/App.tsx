import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { AppendixCollapsibles } from './components/AppendixCollapsibles'
import { EntryCard } from './components/EntryCard'
import { NameBuilder } from './components/NameBuilder'
import type { DictionaryEntry, DictionaryPayload } from './types'

/** Bundled in `web/public/`; same file the extractor reads. Follows Vite `base` (`/` in local dev, `/word_roots/` when built with `.env.production`). */
const base = import.meta.env.BASE_URL
const BORROR_PDF = `${base}dictionary_of_word_roots_and_combining_forms_borror.pdf`

/** First browse bucket: strip Borror lead-in marks (`=`, `•`, `*`, `«`/`»` guillemet OCR, spaces). Not stripped: `-` (suffix entries), `;` junk, or accented letters (`é`) — those sort under “#”. */
function browseLetter(entry: DictionaryEntry): string {
  const r = entry.roots.replace(/^[*•=«»\s]+/, '')
  const ch = r.charAt(0).toUpperCase()
  return /[A-Z]/.test(ch) ? ch : '#'
}

function matchesSearch(query: string, entry: DictionaryEntry): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const terms = q.split(/\s+/).filter(Boolean)
  const hay = `${entry.roots}\n${entry.meaning}\n${entry.langCode}`.toLowerCase()
  return terms.every((t) => hay.includes(t))
}

const SPECIES_TOOL_PANEL_ID = 'species-name-tool-panel'

/** Initial rows when searching; "Show more" adds another batch of this size. */
const SEARCH_PAGE_SIZE = 200

export default function App() {
  const [data, setData] = useState<DictionaryPayload | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const deferredSearch = useDeferredValue(search)
  const [letter, setLetter] = useState('A')
  const [speciesToolOpen, setSpeciesToolOpen] = useState(false)
  const [searchVisibleCount, setSearchVisibleCount] = useState(SEARCH_PAGE_SIZE)

  useEffect(() => {
    fetch(`${base}dictionary.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((payload: DictionaryPayload) => setData(payload))
      .catch((e: Error) => setLoadError(e.message))
  }, [])

  const byLetter = useMemo(() => {
    if (!data) return new Map<string, DictionaryEntry[]>()
    const map = new Map<string, DictionaryEntry[]>()
    for (const e of data.entries) {
      const L = browseLetter(e)
      if (!map.has(L)) map.set(L, [])
      map.get(L)!.push(e)
    }
    return map
  }, [data])

  const letters = useMemo(() => {
    const ls = [...byLetter.keys()].filter((x) => x !== '#')
    ls.sort()
    if (byLetter.has('#')) ls.push('#')
    return ls
  }, [byLetter])

  useEffect(() => {
    if (!letters.length) return
    if (!letters.includes(letter)) {
      // Letter invalid after data load (e.g. first paint '#'); sync to first available bucket.
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot correction when `letters` first populates
      setLetter(letters[0]!)
    }
  }, [letters, letter])

  const searchMatches = useMemo(() => {
    if (!data) return []
    const q = deferredSearch.trim()
    if (!q) return []
    return data.entries.filter((e) => matchesSearch(deferredSearch, e))
  }, [data, deferredSearch])

  const displayedEntries = useMemo(() => {
    if (!data) return []
    const q = deferredSearch.trim()
    if (q) {
      return searchMatches.slice(0, searchVisibleCount)
    }
    return byLetter.get(letter) ?? []
  }, [data, deferredSearch, letter, byLetter, searchMatches, searchVisibleCount])

  const isSearching = Boolean(deferredSearch.trim())
  const searchMatchTotal = searchMatches.length
  const canShowMoreSearch = isSearching && searchVisibleCount < searchMatchTotal

  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col px-4 pb-16 pt-8 md:px-6">
      <header className="mb-10 text-center">
        <h1 className="font-serif text-3xl font-medium tracking-tight text-white md:text-4xl">
          Word Roots
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-neutral-400 md:text-base">
          A tool for easier access to the information in{' '}
          <cite className="not-italic text-neutral-200">Dictionary of Word Roots and Combining Forms</cite>{' '}
          (first edition, 1960) by <span className="text-neutral-200">Donald J. Borror</span>, Mayfield
          Publishing Company. There are some OCR errors in our transcription; while we&apos;re working on
          them, the PDF remains the authoritative source for the dictionary text and for Borror’s
          sections on formulation of scientific names and transliteration.
        </p>
        <a
          href={BORROR_PDF}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center rounded-md border border-neutral-700 bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black"
        >
          Open book PDF
        </a>
      </header>

      <AppendixCollapsibles />

      {loadError && (
        <p className="mb-6 rounded-md border border-neutral-600 bg-neutral-950 px-3 py-2 text-sm text-neutral-200">
          Could not load dictionary data: {loadError}
        </p>
      )}

      {!data && !loadError && (
        <p className="text-center text-neutral-500">Loading dictionary…</p>
      )}

      {data && (
        <>
          <div className="mb-6">
            <button
              type="button"
              id="species-tool-toggle"
              aria-expanded={speciesToolOpen}
              aria-controls={SPECIES_TOOL_PANEL_ID}
              onClick={() => setSpeciesToolOpen((o) => !o)}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 text-left text-sm font-medium text-neutral-100 hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-white/30 md:justify-start"
            >
              <span aria-hidden className="text-neutral-400">
                {speciesToolOpen ? '▼' : '▶'}
              </span>
              <span>
                Compound name builder — draft a multi-root species epithet from an English phrase
              </span>
            </button>
            <div
              id={SPECIES_TOOL_PANEL_ID}
              role="region"
              aria-labelledby="species-tool-toggle"
              hidden={!speciesToolOpen}
              className="mt-4"
            >
              <NameBuilder entries={data.entries} />
            </div>
          </div>

          <section className="space-y-4" aria-label="Dictionary">
            <p className="text-pretty text-sm leading-relaxed text-neutral-400">
              Search English glosses and roots, or browse by the first letter of each headword (after
              stripping leading marks such as <span className="text-neutral-500">=</span>). Within each
              letter, order is the same as the printed book (left column then right column per page).
              Mis-OCR headwords that were misread as starting with the wrong letter are corrected in
              our data where we have identified them. Each card
              expands Borror’s shorthand (language tags, hyphens, connecting vowels).
            </p>
            <label className="block">
              <span className="sr-only">Search English or roots</span>
              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setSearchVisibleCount(SEARCH_PAGE_SIZE)
                }}
                placeholder="e.g. eagle, forest, sharp…"
                className="w-full rounded-lg border border-neutral-700 bg-black px-4 py-3 font-sans text-neutral-100 placeholder:text-neutral-600 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-white/30"
              />
            </label>

          <div className="flex flex-wrap justify-center gap-1.5">
            {letters.map((L) => (
              <button
                key={L}
                type="button"
                className={`min-w-[2.25rem] rounded-md border px-2 py-1.5 text-sm font-medium ${
                  letter === L && !isSearching
                    ? 'border-white bg-white text-black'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200'
                }`}
                onClick={() => {
                  setSearch('')
                  setSearchVisibleCount(SEARCH_PAGE_SIZE)
                  setLetter(L)
                }}
              >
                {L}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-neutral-500">
            {isSearching ? (
              <>
                {searchMatchTotal.toLocaleString()} match{searchMatchTotal === 1 ? '' : 'es'} (all
                letters). Showing {Math.min(searchVisibleCount, searchMatchTotal).toLocaleString()} of{' '}
                {searchMatchTotal.toLocaleString()}. Pick a letter or clear the search box to browse by
                letter in book order.
              </>
            ) : (
              <>
                Letter by first character of the headword (ignoring leading marks). Book order within
                “{letter}”.
              </>
            )}
          </p>

          <p className="text-center text-sm text-neutral-500">
            {data.entryCount.toLocaleString()} entries
            {data.order === 'book-columns' ? ' · book column order' : ''}
          </p>

          <ul className="max-h-[70svh] space-y-3 overflow-y-auto pr-1">
            {displayedEntries.map((e) => (
              <li key={e.id}>
                <EntryCard entry={e} />
              </li>
            ))}
          </ul>
          {isSearching && displayedEntries.length === 0 && (
            <p className="text-center text-neutral-500">No matches.</p>
          )}
          {!isSearching && displayedEntries.length === 0 && (
            <p className="text-center text-neutral-500">No entries for this letter.</p>
          )}
          {canShowMoreSearch && (
            <div className="flex justify-center">
              <button
                type="button"
                className="rounded-md border border-neutral-600 bg-neutral-950 px-4 py-2 text-sm font-medium text-neutral-200 hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-white/30"
                onClick={() => setSearchVisibleCount((n) => n + SEARCH_PAGE_SIZE)}
              >
                Show more ({SEARCH_PAGE_SIZE} more)
              </button>
            </div>
          )}
          </section>
        </>
      )}

      <footer className="mt-auto pt-12 text-center text-xs text-neutral-500">
        <a
          href="https://hromp.com/"
          className="text-neutral-400 underline-offset-2 hover:text-white hover:underline"
        >
          hromp.com
        </a>
        <span className="text-neutral-600"> · </span>
        <a
          href="https://github.com/151henry151/word_roots"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-400 underline-offset-2 hover:text-white hover:underline"
        >
          GitHub
        </a>
      </footer>
    </div>
  )
}
