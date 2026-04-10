/**
 * Split a meaning string on Borror’s inline language labels, e.g.
 * "A line; flax; (G): a net, cloth" → Latin lead-in + Greek gloss after "(G):".
 *
 * Text before the first "(CODE):" uses the entry’s primary language code (first token).
 */
const INLINE_LANG_COLON = /\s*\(([A-Za-z][A-Za-z ]*)\):\s*/g

export type GlossBlock = { langCode: string; text: string }

export function parseMeaningIntoGlossBlocks(meaning: string, entryLangCode: string): GlossBlock[] {
  const trimmed = meaning.trim()
  if (!trimmed) {
    return [{ langCode: entryLangCode.trim() || 'L', text: '' }]
  }

  const matches = [...trimmed.matchAll(INLINE_LANG_COLON)]
  if (matches.length === 0) {
    return [{ langCode: entryLangCode.trim() || 'L', text: trimmed }]
  }

  const primary =
    entryLangCode
      .trim()
      .split(/\s+/)
      .find(Boolean) ?? 'L'

  const out: GlossBlock[] = []
  const firstIdx = matches[0]?.index ?? 0
  const before = trimmed.slice(0, firstIdx).trim()
  if (before) {
    out.push({ langCode: primary, text: before })
  }

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i]!
    const code = m[1]!.trim()
    const start = (m.index ?? 0) + m[0].length
    const end = i + 1 < matches.length ? (matches[i + 1]!.index ?? trimmed.length) : trimmed.length
    const text = trimmed.slice(start, end).trim()
    out.push({ langCode: code, text })
  }

  return out
}
