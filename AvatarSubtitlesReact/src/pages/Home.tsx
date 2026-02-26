import { Link } from 'react-router-dom'
import { EPISODES } from '../data'
import type { EpisodeMeta } from '../data'
import './Home.scss'

export default function Home(): JSX.Element {
  const bySeason = EPISODES.reduce<Record<number, EpisodeMeta[]>>((acc, ep) => {
    if (!acc[ep.season]) acc[ep.season] = []
    acc[ep.season].push(ep)
    return acc
  }, {})

  return (
    <div className="home wrap">
      <h1>Аватар: Легенда об Аанге</h1>
      <p className="sub">Субтитры по сезонам и сериям</p>

      {Object.entries(bySeason)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([season, episodes]) => (
          <div key={season}>
            <h2 className="section-title">{season} сезон</h2>
            <ul className="episodes">
              {episodes
                .sort((a, b) => a.episode - b.episode)
                .map((ep) => (
                  <li key={`${ep.season}-${ep.episode}`}>
                    <Link
                      to={`/episode/${ep.season}/${ep.episode}`}
                      className="episode-link"
                    >
                      <span className="title">
                        Episode {ep.episode} — {ep.title}
                      </span>
                      <span className="desc">{ep.desc}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
    </div>
  )
}
