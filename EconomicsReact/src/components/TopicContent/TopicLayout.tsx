import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import './TopicContent.scss'

interface TopicLayoutProps {
  title: string
  children: ReactNode
  variant?: 'green' | 'blue'
}

export default function TopicLayout({ title, children, variant = 'green' }: TopicLayoutProps): JSX.Element {
  const contentClass = variant === 'blue' ? 'topic-content topic-content--blue' : 'topic-content'
  return (
    <div className="topic-layout">
      <div className="topic-layout__back">
        <Link to="/">← Economics topics / К темам по экономике</Link>
      </div>
      <div className="topic-layout__content">
        <article className={contentClass}>
          <h1>{title}</h1>
          {children}
        </article>
      </div>
    </div>
  )
}
