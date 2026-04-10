import type { ReactNode } from 'react'

/** OCR sometimes inserts `|` between words that were split across lines. */
function fixOcrPipeGlitch(text: string): string {
  return text.replace(/([^\s|])\|([^\s|])/g, '$1 $2')
}

/**
 * Column-style row: multiple space gaps between non-space chunks (PDF table / aligned list).
 */
function lineLooksTabular(line: string): boolean {
  const t = line.trimEnd()
  return t.length > 0 && /\S\s{2,}\S/.test(t)
}

type Run = { kind: 'prose' | 'pre'; lines: string[] }

function runsFromLines(lines: string[]): Run[] {
  const runs: Run[] = []
  let cur: Run | null = null

  const pushLine = (line: string, asPre: boolean) => {
    const kind = asPre ? 'pre' : 'prose'
    if (!cur || cur.kind !== kind) {
      cur = { kind, lines: [] }
      runs.push(cur)
    }
    cur.lines.push(line.trimEnd())
  }

  for (const line of lines) {
    const trimmed = line.trimEnd()
    if (!trimmed.trim()) {
      continue
    }
    const asPre = lineLooksTabular(trimmed)
    pushLine(trimmed, asPre)
  }

  return runs
}

/**
 * Split OCR text on blank runs, then split each chunk into alternating prose (reflowed) and
 * column-aligned <pre> blocks so mobile wraps naturally without PDF column-width line breaks.
 */
export function formatBookSectionBody(body: string): ReactNode {
  const cleaned = fixOcrPipeGlitch(body.replace(/\r\n/g, '\n'))
  const chunks = cleaned.split(/\n{2,}/)
  const out: ReactNode[] = []
  let key = 0

  for (const chunk of chunks) {
    const lines = chunk.split('\n')
    const runs = runsFromLines(lines)

    if (runs.length === 0) continue

    for (const run of runs) {
      if (run.kind === 'pre') {
        const preText = run.lines.join('\n').trimEnd()
        if (!preText) continue
        out.push(
          <pre
            key={key++}
            className="mb-4 overflow-x-auto whitespace-pre font-mono text-[0.8125rem] leading-snug text-neutral-300 last:mb-0 [overflow-wrap:normal]"
          >
            {preText}
          </pre>,
        )
      } else {
        const prose = run.lines
          .map((l) => l.trim())
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim()
        if (!prose) continue
        out.push(
          <p
            key={key++}
            className="mb-4 text-pretty text-[0.9375rem] leading-relaxed text-neutral-300 last:mb-0"
          >
            {prose}
          </p>,
        )
      }
    }
  }

  return <>{out}</>
}
