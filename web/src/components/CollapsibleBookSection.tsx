import { useId, useState } from 'react'

import { formatBookSectionBody } from '../formatBookBody'

export function CollapsibleBookSection({
  title,
  body,
  defaultOpen = false,
}: {
  title: string
  body: string
  defaultOpen?: boolean
}) {
  const baseId = useId()
  const panelId = `${baseId}-panel`
  const btnId = `${baseId}-btn`
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="mb-3">
      <button
        type="button"
        id={btnId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 rounded-lg border border-neutral-700/90 bg-neutral-950 px-3 py-2.5 text-left text-sm font-medium text-neutral-200 hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-white/30"
      >
        <span aria-hidden className="shrink-0 text-neutral-400">
          {open ? '▼' : '▶'}
        </span>
        <span>{title}</span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        hidden={!open}
        className="mt-2"
      >
        <div className="max-h-[min(70vh,42rem)] overflow-y-auto rounded-lg border border-neutral-700/60 bg-black px-4 py-3 text-left font-serif [overflow-wrap:anywhere]">
          {formatBookSectionBody(body)}
        </div>
      </div>
    </div>
  )
}
