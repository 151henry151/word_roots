import { useEffect, useState } from 'react'
import { CollapsibleBookSection } from './CollapsibleBookSection'
import { BORROR_INTRODUCTION } from '../content/borrorBookSections'

type AppendixBodies = {
  formulation: string
  transliteration: string
  combining: string
}

/**
 * Loads post-dictionary PDF sections in three async chunks (smaller initial JS bundle).
 */
export function AppendixCollapsibles() {
  const [bodies, setBodies] = useState<AppendixBodies | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([
      import('../content/borrorFormulation'),
      import('../content/borrorTransliteration'),
      import('../content/borrorCombining'),
    ]).then(([f, t, c]) => {
      if (cancelled) return
      setBodies({
        formulation: f.BORROR_FORMULATION_OF_SCIENTIFIC_NAMES,
        transliteration: t.BORROR_TRANSLITERATION_OF_GREEK_WORDS,
        combining: c.BORROR_SOME_COMMON_COMBINING_FORMS,
      })
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="mb-6 space-y-3">
      <CollapsibleBookSection title="Introduction" body={BORROR_INTRODUCTION} />
      {!bodies ? (
        <p className="rounded-lg border border-stone-700/60 bg-stone-900/40 px-3 py-2 text-sm text-stone-500">
          Loading appendix sections…
        </p>
      ) : (
        <>
          <CollapsibleBookSection title="Formulation of scientific names" body={bodies.formulation} />
          <CollapsibleBookSection title="Transliteration of Greek words" body={bodies.transliteration} />
          <CollapsibleBookSection title="Some common combining forms" body={bodies.combining} />
        </>
      )}
    </div>
  )
}
