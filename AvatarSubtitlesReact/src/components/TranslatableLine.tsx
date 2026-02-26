import { getTranslation } from '../data/glossary'

const WORD_RE = /[\w']+|[^\w\s]/g

interface TranslatableLineProps {
  text: string
  className?: string
}

export default function TranslatableLine({ text, className = '' }: TranslatableLineProps): JSX.Element {
  const parts: JSX.Element[] = []
  let lastIndex = 0
  let m: RegExpExecArray | null
  const re = new RegExp(WORD_RE.source, 'g')
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIndex) {
      parts.push(<span key={`t-${lastIndex}`}>{text.slice(lastIndex, m.index)}</span>)
    }
    const word = m[0]
    const isWord = /^[\w']+$/i.test(word)
    const translation = isWord ? getTranslation(word) : ''
    parts.push(
      <span
        key={`w-${m.index}`}
        className={isWord ? 'word' : ''}
        title={translation || undefined}
      >
        {word}
      </span>
    )
    lastIndex = m.index + word.length
  }
  if (lastIndex < text.length) {
    parts.push(<span key={`t-${lastIndex}`}>{text.slice(lastIndex)}</span>)
  }
  return <span className={className}>{parts}</span>
}
