/** Abbreviations from Borror, “How To Use This Dictionary” (ABBREVIATIONS). */
export const LANG_NAMES: Record<string, string> = {
  Af: 'African',
  Ar: 'Arabic',
  AS: 'Anglo-Saxon',
  Br: 'Brazilian',
  Ch: 'Chilean',
  Dan: 'Danish',
  E: 'English',
  EI: 'East Indian',
  F: 'French',
  Far: 'Faroese',
  G: 'Greek',
  Ger: 'German',
  Go: 'Gothlandic',
  H: 'Hindustani',
  Hb: 'Hebrew',
  Ice: 'Icelandic',
  It: 'Italian',
  L: 'Latin',
  LL: 'Low Latin; Late Latin',
  Mai: 'Malayan',
  Mex: 'Mexican',
  ME: 'Middle English',
  ML: 'Middle Latin',
  My: 'Mythology',
  N: 'a proper name',
  NL: 'New Latin',
  OF: 'Old French',
  OHG: 'Old High German',
  Pg: 'Portuguese',
  Pp: 'Papuan',
  Ps: 'Persian',
  Pv: 'Peruvian',
  Rs: 'Russian',
  SAm: 'South American',
  Sp: 'Spanish',
  Sw: 'Swedish',
}

export function describeLangCodes(code: string): string {
  const parts = code.trim().split(/\s+/)
  return parts
    .map((p) => {
      const full = LANG_NAMES[p]
      return full ? `${full} (${p})` : p
    })
    .join('; ')
}
