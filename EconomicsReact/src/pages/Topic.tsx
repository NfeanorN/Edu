import { useParams, Link } from 'react-router-dom'
import { getTopicBySlug } from '../data/topics'
import { getTopicContent } from '../content/topics'
import { TopicLayout, TopicContentView } from '../components/TopicContent'

export default function Topic(): JSX.Element {
  const { slug } = useParams<{ slug: string }>()
  const topic = getTopicBySlug(slug)
  const content = getTopicContent(slug)

  if (!topic || !content) {
    return (
      <div className="topic-content" style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
        <p>Topic not found.</p>
        <Link to="/">← Back to Economics topics</Link>
      </div>
    )
  }

  const variant = slug === 'demand' || slug === 'rational-choice' || slug === 'gdp-macro' || slug === 'is-lm' || slug === 'goods-market-multiplier' ? 'blue' : 'green'

  return (
    <TopicLayout title={topic.title} variant={variant}>
      <TopicContentView blocks={content} />
    </TopicLayout>
  )
}
