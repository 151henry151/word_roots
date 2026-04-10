import { useEffect, useState } from 'react'
import {
  MAX_COMPOUND_ROOTS,
  suggestSpeciesName,
  type SuggestNameResult,
} from '../nameBuilder'
import type { DictionaryEntry } from '../types'
import { describeLangCodes, expandInlineMeaningLangTags } from '../langNames'

export function NameBuilder({ entries }: { entries: DictionaryEntry[] }) {
  const [phrase, setPhrase] = useState('sea eagle')
  const [result, setResult] = useState<SuggestNameResult | null>(null)

  useEffect(() => {
    if (entries.length === 0) return
    setResult(suggestSpeciesName(phrase, entries))
    // Re-run when the dictionary loads; phrase is intentionally the value from first paint.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries])

  const run = () => setResult(suggestSpeciesName(phrase, entries))

  return (
    <section
      className="mb-10 rounded-xl border border-neutral-700/60 bg-neutral-950 px-4 py-5 md:px-5"
      aria-label="Name builder"
    >
      <h2 className="font-serif text-xl font-medium text-neutral-100">Compound name builder (draft)</h2>
      <p className="mt-2 text-sm leading-relaxed text-neutral-400">
        Describe the organism in a few English words (articles and glue words are skipped). Each
        remaining word is matched to a gloss, stems are chained left-to-right with the rules in{' '}
        <em>Formulation of Scientific Names</em> (up to {MAX_COMPOUND_ROOTS} roots). Add proper Latin endings for
        genus or species to agree with grammar elsewhere in the name.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label className="min-w-0 flex-1">
          <span className="sr-only">Description</span>
          <input
            type="text"
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && run()}
            placeholder="e.g. sea eagle"
            className="w-full rounded-lg border border-neutral-600 bg-black px-3 py-2.5 font-sans text-neutral-100 placeholder:text-neutral-600 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-white/30"
          />
        </label>
        <button
          type="button"
          onClick={run}
          className="shrink-0 rounded-lg border border-neutral-700 bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-neutral-200"
        >
          Combine roots
        </button>
      </div>

      {result?.note && (
        <p className="mt-3 text-sm text-neutral-500">{result.note}</p>
      )}

      {result?.error && (
        <p className="mt-4 text-sm text-neutral-200">{result.error}</p>
      )}

      {result && result.matches.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm text-neutral-300">
          {result.matches.map((m) => (
            <li key={m.entry.id}>
              <span className="text-neutral-500">“{m.token}” → </span>
              <code className="text-white">{m.entry.roots}</code>
              <span className="text-neutral-500"> ({describeLangCodes(m.entry.langCode)}) </span>
              <span className="text-neutral-400">— {expandInlineMeaningLangTags(m.entry.meaning)}</span>
            </li>
          ))}
        </ul>
      )}

      {result?.combine && (
        <div className="mt-4 rounded-lg border border-neutral-700 bg-black/50 px-4 py-3">
          <p className="font-mono text-lg text-neutral-100">
            <span className="text-neutral-500">Epithet (lowercase): </span>
            {result.combine.speciesEpithet}
          </p>
          <p className="mt-1 font-mono text-neutral-300">
            <span className="text-neutral-500">Genus-style stem: </span>
            {result.combine.genusStyle}
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-neutral-400">
            {result.combine.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
