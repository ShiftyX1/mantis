import { forwardRef } from 'react'
import CodeEditorBase from '@uiw/react-textarea-code-editor'

interface Props {
  value: string
  onChange: (value: string) => void
  language?: string
  placeholder?: string
  className?: string
  minHeight?: number
}

export const CodeEditor = forwardRef<HTMLTextAreaElement, Props>(
  function CodeEditor({ value, onChange, language = 'bash', placeholder, className, minHeight = 220 }, ref) {
    return (
      <CodeEditorBase
        ref={ref as React.Ref<HTMLTextAreaElement>}
        value={value}
        language={language}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        padding={12}
        data-color-mode="dark"
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
          fontSize: 12,
          lineHeight: 1.6,
          minHeight,
          borderRadius: 8,
          border: '1px solid var(--border, #27272a)',
          backgroundColor: '#18181b',
        }}
        className={className}
      />
    )
  },
)
