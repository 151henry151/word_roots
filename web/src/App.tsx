import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { CollapsibleBookSection } from './components/CollapsibleBookSection'
import { EntryCard } from './components/EntryCard'
import { NameBuilder } from './components/NameBuilder'
import { BORROR_INTRODUCTION } from './content/borrorBookSections'
import type { DictionaryEntry, DictionaryPayload } from './types'

/** Bundled in `web/public/`; same file the extractor reads. Follows Vite `base` (`/` in local dev, `/word_roots/` when built with `.env.production`). */
const base = import.meta.env.BASE_URL
const BORROR_PDF = `${base}dictionary_of_word_roots_and_combining_forms_borror.pdf`

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

export default function App() {
  const [data, setData] = useState<DictionaryPayload | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const deferredSearch = useDeferredValue(search)
  const [letter, setLetter] = useState('A')
  const [speciesToolOpen, setSpeciesToolOpen] = useState(false)

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
      setLetter(letters[0]!)
    }
  }, [letters, letter])

  const displayedEntries = useMemo(() => {
    if (!data) return []
    const q = deferredSearch.trim()
    if (q) {
      return data.entries.filter((e) => matchesSearch(deferredSearch, e)).slice(0, 200)
    }
    return byLetter.get(letter) ?? []
  }, [data, deferredSearch, letter, byLetter])

  const isSearching = Boolean(deferredSearch.trim())

  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col px-4 pb-16 pt-8 md:px-6">
      <header className="mb-10 text-center">
        <h1 className="font-serif text-3xl font-medium tracking-tight text-stone-100 md:text-4xl">
          Word Roots
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-stone-400 md:text-base">
          A tool for easier access to the information in{' '}
          <cite className="not-italic text-stone-300">Dictionary of Word Roots and Combining Forms</cite>{' '}
          (first edition, 1960) by <span className="text-stone-300">Donald J. Borror</span>, Mayfield
          Publishing Company. The PDF remains the authoritative source for the dictionary text and for
          Borror’s sections on formulation of scientific names and transliteration.
        </p>
        <a
          href={BORROR_PDF}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center rounded-md bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-stone-950"
        >
          Open book PDF
        </a>
      </header>

      <div className="mb-6">
        <CollapsibleBookSection title="Introduction" body={BORROR_INTRODUCTION} />
      </div>

      {loadError && (
        <p className="mb-6 rounded-md border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          Could not load dictionary data: {loadError}
        </p>
      )}

      {!data && !loadError && (
        <p className="text-center text-stone-500">Loading dictionary…</p>
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
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-violet-800/60 bg-stone-900/80 px-4 py-3 text-left text-sm font-medium text-stone-100 hover:bg-stone-800/90 focus:outline-none focus:ring-2 focus:ring-violet-500 md:justify-start"
            >
              <span aria-hidden className="text-violet-400">
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
            <p className="text-pretty text-sm leading-relaxed text-stone-400">
              Search English glosses and roots, or browse by headword letter in the same order as the
              printed book (each page: full left column, then full right). Each card expands
              Borror’s shorthand (language tags, hyphens, connecting vowels).
            </p>
            <label className="block">
              <span className="sr-only">Search English or roots</span>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="e.g. eagle, forest, sharp…"
                className="w-full rounded-lg border border-stone-600 bg-stone-900 px-4 py-3 font-sans text-stone-100 placeholder:text-stone-600 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </label>

          <div className="flex flex-wrap justify-center gap-1.5">
            {letters.map((L) => (
              <button
                key={L}
                type="button"
                className={`min-w-[2.25rem] rounded-md px-2 py-1.5 text-sm font-medium ${
                  letter === L && !isSearching
                    ? 'bg-violet-600 text-white'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
                onClick={() => {
                  setSearch('')
                  setLetter(L)
                }}
              >
                {L}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-stone-500">
            {isSearching ? (
              <>
                Showing up to 200 matches (all letters). Pick a letter or clear the search box to
                browse by letter in book order.
              </>
            ) : (
              <>
                Letter by first character of the headword (ignoring leading marks). Book order
                within “{letter}”.
              </>
            )}
          </p>

          <p className="text-center text-sm text-stone-500">
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
            <p className="text-center text-stone-500">No matches.</p>
          )}
          {!isSearching && displayedEntries.length === 0 && (
            <p className="text-center text-stone-500">No entries for this letter.</p>
          )}
          </section>
        </>
      )}

      <footer className="mt-auto pt-12 text-center text-xs text-stone-600">
        {data?.source}. GPL-3.0.
      </footer>
    </div>
  )
}
