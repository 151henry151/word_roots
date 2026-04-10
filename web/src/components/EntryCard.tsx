import { parseMeaningIntoGlossBlocks } from '../glossBlocks'
import { describeLangCodes } from '../langNames'
import { explainEntry } from '../notation'
import type { DictionaryEntry } from '../types'

export function EntryCard({ entry }: { entry: DictionaryEntry }) {
  const notes = explainEntry(entry)
  const glossBlocks = parseMeaningIntoGlossBlocks(entry.meaning, entry.langCode)

  return (
    <article className="rounded-lg border border-neutral-700/80 bg-neutral-950 px-4 py-3 text-left shadow-sm">
      <div className="font-mono text-base text-white md:text-lg">{entry.roots}</div>
      {glossBlocks.length === 1 ? (
        <>
          <div className="mt-1 text-sm text-neutral-400">
            <span className="text-neutral-500">Language: </span>
            {describeLangCodes(entry.langCode)}
          </div>
          <p className="mt-2 text-neutral-100">{glossBlocks[0]!.text}</p>
        </>
      ) : (
        <div className="mt-1 space-y-4">
          {glossBlocks.map((b, i) => (
            <div key={i}>
              <div className="text-sm text-neutral-400">
                <span className="text-neutral-500">Language: </span>
                {describeLangCodes(b.langCode)}
              </div>
              <p className="mt-2 text-neutral-100">{b.text}</p>
            </div>
          ))}
        </div>
      )}
      {notes.length > 0 && (
        <div className="mt-3 border-t border-neutral-700/60 pt-3">
          <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-neutral-400">
            {notes.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}
