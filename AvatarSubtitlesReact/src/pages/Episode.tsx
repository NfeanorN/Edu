import { Link, useParams } from 'react-router-dom'
import { getEpisodeData, getEpisodeMeta } from '../data'
import TranslatableLine from '../components/TranslatableLine'
import './Episode.scss'

export default function Episode(): JSX.Element {
  const { season, episode } = useParams<{ season: string; episode: string }>()
  const s = season ? parseInt(season, 10) : NaN
  const e = episode ? parseInt(episode, 10) : NaN
  const meta = !isNaN(s) && !isNaN(e) ? getEpisodeMeta(s, e) : null
  const data = !isNaN(s) && !isNaN(e) ? getEpisodeData(s, e) : null

  if (!meta || !data) {
    return (
      <div className="episode-page wrap">
        <p>Episode not found.</p>
        <Link to="/">← Back to episodes</Link>
      </div>
    )
  }

  return (
    <div className="episode-page wrap">
      <div className="back">
        <Link to="/">← All episodes</Link>
      </div>
      <h1>
        Season {data.season}, Episode {data.episode} — {data.title}
      </h1>
      <p className="meta">
        {data.show} · Full English transcript · Hover a word for translation
      </p>

      <div className="subtitles">
        {data.entries.map((entry) => (
          <div key={entry.id} className="subtitle-block">
            <div className="subtitle-text">
              <TranslatableLine text={entry.text} />
            </div>
          </div>
        ))}
      </div>

      {data.source && (
        <p className="source">
          Transcript:{' '}
          <a href={data.source} target="_blank" rel="noopener noreferrer">
            Forever Dreaming
          </a>
        </p>
      )}
    </div>
  )
}
