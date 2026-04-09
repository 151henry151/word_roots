import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { EntryCard } from './components/EntryCard'
import { NameBuilder } from './components/NameBuilder'
import type { DictionaryEntry, DictionaryPayload } from './types'

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

export default function App() {
  const [data, setData] = useState<DictionaryPayload | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const deferredSearch = useDeferredValue(search)
  const [letter, setLetter] = useState('A')

  useEffect(() => {
    fetch('/dictionary.json')
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
      <header className="mb-8 text-center">
        <h1 className="font-serif text-3xl font-medium tracking-tight text-stone-100 md:text-4xl">
          Dictionary of word roots
        </h1>
        <p className="mt-3 text-pretty text-stone-400">
          Digital index to Borror: filter by letter or search English glosses, roots, and language
          tags. Entry order follows each printed page (full left column, then full right). Each
          card unpacks the book’s shorthand (language tags, hyphens, connecting vowels).
        </p>
        {data && (
          <p className="mt-2 text-sm text-stone-500">
            {data.entryCount.toLocaleString()} entries
            {data.order === 'book-columns' ? ' · book column order' : ''}
          </p>
        )}
      </header>

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
        <NameBuilder entries={data.entries} />
        <section className="space-y-4" aria-label="Dictionary">
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
