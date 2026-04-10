import { parseMeaningIntoGlossBlocks } from '../glossBlocks'
import { describeLangCodes } from '../langNames'
import { explainEntry } from '../notation'
import type { DictionaryEntry } from '../types'

export function EntryCard({ entry }: { entry: DictionaryEntry }) {
  const notes = explainEntry(entry)
  const glossBlocks = parseMeaningIntoGlossBlocks(entry.meaning, entry.langCode)

  return (
    <article className="rounded-lg border border-stone-700/80 bg-stone-900/50 px-4 py-3 text-left shadow-sm">
      <div className="font-mono text-base text-violet-200 md:text-lg">{entry.roots}</div>
      {glossBlocks.length === 1 ? (
        <>
          <div className="mt-1 text-sm text-stone-400">
            <span className="text-stone-500">Language: </span>
            {describeLangCodes(entry.langCode)}
          </div>
          <p className="mt-2 text-stone-100">{glossBlocks[0]!.text}</p>
        </>
      ) : (
        <div className="mt-1 space-y-4">
          {glossBlocks.map((b, i) => (
            <div key={i}>
              <div className="text-sm text-stone-400">
                <span className="text-stone-500">Language: </span>
                {describeLangCodes(b.langCode)}
              </div>
              <p className="mt-2 text-stone-100">{b.text}</p>
            </div>
          ))}
        </div>
      )}
      {notes.length > 0 && (
        <div className="mt-3 border-t border-stone-700/60 pt-3">
          <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-stone-400">
            {notes.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}
