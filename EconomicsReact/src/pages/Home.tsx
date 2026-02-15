import { Link } from 'react-router-dom'
import { TOPICS } from '../data/topics'
import type { Topic } from '../data/topics'
import './Home.scss'

export default function Home(): JSX.Element {
  const micro: Topic[] = TOPICS.filter((t) => t.section === 'micro')
  const macro: Topic[] = TOPICS.filter((t) => t.section === 'macro')

  return (
    <div className="home wrap">
      <h1>Economics for Business</h1>
      <p className="sub">Economics / Экономика — Syllabus topics with explanations and graphs</p>

      <h2 className="section-title">Part I — Microeconomics / Микроэкономика</h2>
      <ul className="topics">
        {micro.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/topic/${topic.slug}`} className="topic-link">
              <span className="title">{topic.title}</span>
              <span className="desc">{topic.desc}</span>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="section-title">Part II — Macroeconomics / Макроэкономика</h2>
      <ul className="topics">
        {macro.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/topic/${topic.slug}`} className="topic-link">
              <span className="title">{topic.title}</span>
              <span className="desc">{topic.desc}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
