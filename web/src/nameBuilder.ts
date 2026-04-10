import type { DictionaryEntry } from './types'

/** Articles and glue words dropped when mapping English to gloss tokens. */
const STOP = new Set([
  'a',
  'an',
  'the',
  'of',
  'for',
  'with',
  'and',
  'or',
  'in',
  'on',
  'at',
  'to',
  'from',
  'by',
  'as',
  'is',
  'are',
  'be',
])

export function tokenizeDescription(phrase: string): string[] {
  return phrase
    .toLowerCase()
    .replace(/[^a-z\s-]/g, ' ')
    .split(/\s+/)
    .map((w) => w.replace(/^-+|-+$/g, ''))
    .filter((w) => w.length > 1 && !STOP.has(w))
}

/** First comma-separated stem token, without leading marks. */
export function primaryStem(rootsField: string): string {
  const first = rootsField.split(',')[0].trim()
  return first.replace(/^[=«»•*-]+/u, '').replace(/^[«»]+/u, '').trim()
}

export function langCodes(entry: DictionaryEntry): string[] {
  return entry.langCode.trim().split(/\s+/)
}

export function isGreek(entry: DictionaryEntry): boolean {
  return langCodes(entry).includes('G')
}

export function isLatin(entry: DictionaryEntry): boolean {
  const c = langCodes(entry)
  return c.includes('L') && !c.includes('G')
}

/**
 * Score dictionary rows by English gloss overlap with a keyword, or by headword / roots field
 * (so e.g. “linol” matches the row whose gloss is “Flax oil”, same as search on roots).
 */
export function bestEntryForKeyword(
  keyword: string,
  entries: DictionaryEntry[],
): { entry: DictionaryEntry; score: number } | null {
  const kw = keyword.toLowerCase()
  if (kw.length < 2) return null
  let best: { entry: DictionaryEntry; score: number } | null = null
  const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const meaningWordBoundary = new RegExp(`\\b${escaped}\\b`, 'i')
  /** Match a stem token in Borror’s comma-separated roots field (not mid-word). */
  const rootsTokenBoundary = new RegExp(`(^|[,\\s])${escaped}([,\\s=]|$)`, 'i')

  for (const e of entries) {
    let score: number | null = null

    const m = e.meaning.toLowerCase()
    if (m.includes(kw)) {
      let s = 0
      if (meaningWordBoundary.test(e.meaning)) s += 120
      else s += 60
      s -= Math.min(e.meaning.length, 180) / 20
      if (isGreek(e) && !e.langCode.includes('L')) s += 8
      score = s
    }

    const stem = primaryStem(e.roots).toLowerCase()
    const r = e.roots
    if (stem === kw) {
      const s = 195 - Math.min(r.length, 100) / 25
      score = score === null ? s : Math.max(score, s)
    } else if (r.toLowerCase().includes(kw)) {
      const s = (rootsTokenBoundary.test(r) ? 145 : 85) - Math.min(r.length, 80) / 40
      score = score === null ? s : Math.max(score, s)
    }

    if (score === null) continue
    if (!best || score > best.score) best = { entry: e, score }
  }
  return best
}

export interface CombineResult {
  epithet: string
  /** Lowercase specific epithet form. */
  speciesEpithet: string
  /** Capitalized genus-style binomial stem (no rank suffix). */
  genusStyle: string
  notes: string[]
}

/**
 * Combine two stems using Borror’s rules (Formulation of Scientific Names + pododynia example):
 * - Greek + Greek: linking ο unless the second root begins with a vowel (then omit it).
 * - If the first stem ends in o and the second begins with o, drop one o (pododynia).
 * - Latin + Latin: default linking i (simplified; book allows exceptions).
 */
export function combineTwoRoots(
  stem1: string,
  stem2: string,
  firstGreek: boolean,
  secondGreek: boolean,
): CombineResult {
  const s1 = stem1.toLowerCase()
  const s2 = stem2.toLowerCase()
  const notes: string[] = []

  if (!firstGreek || !secondGreek) {
    if (firstGreek !== secondGreek) {
      notes.push(
        'Borror notes that roots in a compound are usually from the same source language; mixed Latin/Greek is possible with common affixes but is avoided for arbitrary roots.',
      )
    }
    const link = 'i'
    notes.push(
      'Latin compounds often use linking vowel i (ο is usual for Greek; see Formulation of Scientific Names).',
    )
    const epithet = `${s1}${link}${s2}`
    return {
      epithet,
      speciesEpithet: epithet,
      genusStyle: epithet.charAt(0).toUpperCase() + epithet.slice(1),
      notes,
    }
  }

  // Greek + Greek
  if (s1.endsWith('o') && s2.startsWith('o')) {
    const epithet = `${s1.slice(0, -1)}${s2}`
    notes.push(
      'Greek compound: the first root appears in a form ending in -o; the second begins with o, so one o is dropped (cf. pododynia from pod, -o + odyn in How to Use This Dictionary).',
    )
    return {
      epithet,
      speciesEpithet: epithet,
      genusStyle: epithet.charAt(0).toUpperCase() + epithet.slice(1),
      notes,
    }
  }

  if (/^[aeiou]/i.test(s2)) {
    const epithet = `${s1}${s2}`
    notes.push(
      'Greek compound: the combining vowel before the second root is omitted when that root begins with a vowel (Formulation of Scientific Names).',
    )
    return {
      epithet,
      speciesEpithet: epithet,
      genusStyle: epithet.charAt(0).toUpperCase() + epithet.slice(1),
      notes,
    }
  }

  const epithet = `${s1}o${s2}`
  notes.push(
    'Greek compound: linked with combining vowel ο between consonant-oriented stems (Formulation of Scientific Names).',
  )
  return {
    epithet,
    speciesEpithet: epithet,
    genusStyle: epithet.charAt(0).toUpperCase() + epithet.slice(1),
    notes,
  }
}

/** Upper bound on roots in one compound (phrase length after stopword removal). */
export const MAX_COMPOUND_ROOTS = 12

/**
 * Chain stems left-to-repeated-right using the same pairwise rules as {@link combineTwoRoots}.
 * `greekFlags[i]` is whether the i-th root is Greek (from the dictionary entry).
 * For each link, the left segment is treated as Greek for formulation only if every root
 * merged into it so far was Greek.
 */
export function combineRootChain(stems: string[], greekFlags: boolean[]): CombineResult {
  if (stems.length === 0) {
    return { epithet: '', speciesEpithet: '', genusStyle: '', notes: [] }
  }
  if (stems.length === 1) {
    const s = stems[0]!.toLowerCase()
    return {
      epithet: s,
      speciesEpithet: s,
      genusStyle: s.charAt(0).toUpperCase() + s.slice(1),
      notes: [],
    }
  }
  let acc = combineTwoRoots(
    stems[0]!,
    stems[1]!,
    greekFlags[0]!,
    greekFlags[1]!,
  )
  const notes = [...acc.notes]
  for (let i = 2; i < stems.length; i++) {
    const leftGreek = greekFlags.slice(0, i).every(Boolean)
    const next = combineTwoRoots(
      acc.speciesEpithet,
      stems[i]!,
      leftGreek,
      greekFlags[i]!,
    )
    notes.push(...next.notes)
    acc = {
      epithet: next.epithet,
      speciesEpithet: next.speciesEpithet,
      genusStyle: next.genusStyle,
      notes,
    }
  }
  return acc
}

/** Heuristic role from Borror’s English gloss (attribute vs principal noun). */
export type GlossRole = 'likely_noun' | 'likely_modifier' | 'unknown'

/**
 * Classify a gloss for word-order hints: coined names usually put descriptive
 * quality before the principal organism or part (Formulation of Scientific Names).
 */
export function glossRoleFromMeaning(meaning: string): GlossRole {
  const m = meaning.trim()
  if (!m) return 'unknown'
  // Dictionary often uses “An X”, “A X”, “The X” for substantive senses.
  if (/^(A|An|The)\s+[a-z]/i.test(m)) return 'likely_noun'
  const firstSeg = m.split(/[;,]/)[0]?.trim() ?? m
  if (/^(Pertaining|Having|Without|Not\s|Un-|Dis-|In-|Ir-|Mis-|Over-|Under-)/i.test(m)) {
    return 'likely_modifier'
  }
  if (
    /^(High|Low|Small|Large|Broad|Narrow|Long|Short|Tall|Thin|Thick|Soft|Hard|Light|Dark|Deep|Young|Old|New|Dry|Wet|Hot|Cold|Full|Empty|Open|Free|Strong|Weak|Great|Little|Good|Bad|Same|Other|Very|All|Some|Few|Many|More|Most|Less|Both|Either|Neither)\b/i.test(
      firstSeg,
    )
  ) {
    return 'likely_modifier'
  }
  return 'unknown'
}

function wordOrderNote(first: DictionaryEntry, second: DictionaryEntry): string {
  const r0 = glossRoleFromMeaning(first.meaning)
  const r1 = glossRoleFromMeaning(second.meaning)
  if (r0 === 'likely_noun' && r1 === 'likely_modifier') {
    return 'Your phrase has the principal idea first and the descriptive word second. In coined names the usual pattern is the opposite: descriptive quality before principal (e.g. Erythrocephala; Formulation of Scientific Names). Try reversing your two words if that fits what you mean.'
  }
  if (r0 === 'likely_modifier' && r1 === 'likely_noun') {
    return 'Word order matches the usual pattern: descriptive quality before principal (Formulation of Scientific Names).'
  }
  return 'Check word order when coining a name: descriptive quality usually precedes the principal organism or part (e.g. Erythrocephala; Formulation of Scientific Names).'
}

/** Word-order hint for 3+ roots: compare first and last gloss roles only. */
function wordOrderNoteMulti(first: DictionaryEntry, last: DictionaryEntry): string {
  const r0 = glossRoleFromMeaning(first.meaning)
  const r1 = glossRoleFromMeaning(last.meaning)
  if (r0 === 'likely_noun' && r1 === 'likely_modifier') {
    return 'Your phrase starts with a principal-like idea and ends with a descriptive one. In coined names, descriptive qualities often come before the principal (Formulation of Scientific Names). Consider reordering words if that fits your intent.'
  }
  if (r0 === 'likely_modifier' && r1 === 'likely_noun') {
    return 'First and last content words follow the usual pattern (descriptive quality toward the front, principal toward the end; Formulation of Scientific Names).'
  }
  return 'Check word order across your phrase: descriptive quality usually precedes the principal organism or part (e.g. Erythrocephala; Formulation of Scientific Names).'
}

export interface SuggestNameResult {
  tokens: string[]
  /** Content words used for the compound (after stopwords; capped at MAX_COMPOUND_ROOTS). */
  usedTokens: string[]
  matches: { token: string; entry: DictionaryEntry; stem: string }[]
  combine: CombineResult | null
  error?: string
  note?: string
}

export function suggestSpeciesName(
  phrase: string,
  entries: DictionaryEntry[],
): SuggestNameResult {
  const tokens = tokenizeDescription(phrase)
  if (tokens.length < 2) {
    return {
      tokens,
      usedTokens: tokens,
      matches: [],
      combine: null,
      error: 'Use at least two meaningful words (e.g. “sea eagle”).',
    }
  }

  let workTokens = tokens
  let note: string | undefined
  if (tokens.length > MAX_COMPOUND_ROOTS) {
    workTokens = tokens.slice(0, MAX_COMPOUND_ROOTS)
    note = `Only the first ${MAX_COMPOUND_ROOTS} content words are used (“${workTokens.join('”, “')}”).`
  }

  const matches: { token: string; entry: DictionaryEntry; stem: string }[] = []
  const usedIds = new Set<number>()

  for (const token of workTokens) {
    const hit = bestEntryForKeyword(token, entries)
    if (!hit) {
      return {
        tokens,
        usedTokens: workTokens,
        matches,
        combine: null,
        error: `No dictionary gloss matched “${token}”. Try a simpler noun or adjective from the book’s English meanings.`,
        note,
      }
    }
    if (usedIds.has(hit.entry.id)) {
      return {
        tokens,
        usedTokens: workTokens,
        matches,
        combine: null,
        error: `The same dictionary row matched twice (“${token}”). Rephrase so each idea maps to a different root.`,
        note,
      }
    }
    usedIds.add(hit.entry.id)
    matches.push({ token, entry: hit.entry, stem: primaryStem(hit.entry.roots) })
  }

  if (matches.length < 2) {
    return {
      tokens,
      usedTokens: workTokens,
      matches,
      combine: null,
      error: 'Need two distinct roots.',
      note,
    }
  }

  const stems = matches.map((m) => m.stem)
  const greekFlags = matches.map((m) => isGreek(m.entry))
  const combine = combineRootChain(stems, greekFlags)

  if (matches.length === 2) {
    combine.notes.push(wordOrderNote(matches[0]!.entry, matches[1]!.entry))
  } else {
    combine.notes.push(
      wordOrderNoteMulti(matches[0]!.entry, matches[matches.length - 1]!.entry),
    )
  }

  return { tokens, usedTokens: workTokens, matches, combine, note }
}
