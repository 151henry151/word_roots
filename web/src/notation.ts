import type { DictionaryEntry } from './types'

/**
 * Natural-language notes for Borror’s typographic conventions
 * (“How To Use This Dictionary”).
 */
export function explainEntry(entry: DictionaryEntry): string[] {
  const { roots, meaning } = entry
  const lines: string[] = []

  if (/see also/i.test(roots)) {
    lines.push(
      'Cross-reference: Borror sends you to alternate spellings or related vowel patterns listed under other headwords.',
    )
  }

  if (roots.includes(', -') || roots.includes(', =') || /,\s*«/.test(roots)) {
    lines.push(
      'Comma-separated pieces list the main stem and frequent combining forms (linking vowels such as -o or -i, or alternate stems in compounds).',
    )
  }

  if (/=/.test(roots)) {
    lines.push(
      'An equals sign (=) marks a form often used as a terminal stem or standing word (e.g. a genus name).',
    )
  }

  if (/(^|[,;]\s*)-/.test(roots)) {
    lines.push(
      'A leading hyphen marks a suffix or a stem usually used at the end of a word.',
    )
  }

  if (meaning.includes(';')) {
    lines.push(
      'Semicolons separate unlike English senses; commas separate related senses.',
    )
  }

  if (lines.length === 0) {
    lines.push(
      'The text before the parenthetical language tag is the root or combining forms; the English phrase after the period is the gloss for naming technical terms.',
    )
  }

  return lines
}
