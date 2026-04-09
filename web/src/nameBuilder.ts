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
  return first.replace(/^[=«»•*\-]+/u, '').replace(/^[«»]+/u, '').trim()
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
 * Score dictionary rows by English gloss overlap with a keyword.
 */
export function bestEntryForKeyword(
  keyword: string,
  entries: DictionaryEntry[],
): { entry: DictionaryEntry; score: number } | null {
  const kw = keyword.toLowerCase()
  if (kw.length < 2) return null
  let best: { entry: DictionaryEntry; score: number } | null = null
  const wordBoundary = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')

  for (const e of entries) {
    const m = e.meaning.toLowerCase()
    if (!m.includes(kw)) continue
    let score = 0
    if (wordBoundary.test(e.meaning)) score += 120
    else score += 60
    // Prefer shorter glosses (more specific) slightly
    score -= Math.min(e.meaning.length, 180) / 20
    // Slight preference for Greek-only roots for compounding Greek names
    if (isGreek(e) && !e.langCode.includes('L')) score += 8
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

export interface SuggestNameResult {
  tokens: string[]
  /** Subset of tokens used for the binary compound (first two content words). */
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
      error: 'Use at least two meaningful words (e.g. “unapproachable eagle”).',
    }
  }

  const workTokens = tokens.slice(0, 2)
  const note =
    tokens.length > 2
      ? `Only the first two content words are used (“${workTokens.join('” + “')}”) for a two-root compound.`
      : undefined

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

  // Attribute (quality) before principal (noun): Borror — quality precedes principal (e.g. Erythrocephala).
  const [first, second] = [matches[0]!, matches[1]!]
  const combine = combineTwoRoots(
    first.stem,
    second.stem,
    isGreek(first.entry),
    isGreek(second.entry),
  )
  combine.notes.push(wordOrderNote(first.entry, second.entry))

  return { tokens, usedTokens: workTokens, matches, combine, note }
}
