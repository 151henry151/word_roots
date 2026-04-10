export interface DictionaryEntry {
  id: number
  roots: string
  langCode: string
  meaning: string
  rawSegment?: string
}

export interface DictionaryPayload {
  source: string
  /** Per PDF page: full left column then full right column (`extract_dictionary.py`). */
  order?: 'book-columns'
  entryCount: number
  entries: DictionaryEntry[]
}
