interface Props {
  parameters: Record<string, unknown>
  onInsert: (snippet: string) => void
}

export function ParamButtons({ parameters, onInsert }: Props) {
  const props = (parameters?.properties ?? {}) as Record<string, unknown>
  const names = Object.keys(props)
  if (names.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1">
      {names.map(name => (
        <button
          key={name}
          type="button"
          onClick={() => onInsert(`{{.${name}}}`)}
          className="px-1.5 py-0.5 rounded text-[11px] font-mono bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 hover:bg-teal-500/20 transition-colors cursor-pointer"
        >
          {'{{.'}{name}{'}}'}
        </button>
      ))}
    </div>
  )
}

export function insertAtCursor(
  el: HTMLTextAreaElement | null,
  snippet: string,
  currentValue: string,
  setValue: (v: string) => void,
) {
  if (!el) {
    setValue(currentValue + snippet)
    return
  }
  const start = el.selectionStart ?? currentValue.length
  const end = el.selectionEnd ?? start
  const next = currentValue.slice(0, start) + snippet + currentValue.slice(end)
  setValue(next)
  requestAnimationFrame(() => {
    const pos = start + snippet.length
    el.selectionStart = pos
    el.selectionEnd = pos
    el.focus()
  })
}
