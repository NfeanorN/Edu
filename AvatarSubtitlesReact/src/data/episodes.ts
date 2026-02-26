export interface SubtitleEntry {
  id: number
  text: string
  start?: string
  end?: string
}

export interface EpisodeData {
  show: string
  season: number
  episode: number
  title: string
  source?: string
  entries: SubtitleEntry[]
}

export interface EpisodeMeta {
  season: number
  episode: number
  slug: string
  title: string
  desc: string
}

export const EPISODES: EpisodeMeta[] = [
  {
    season: 1,
    episode: 5,
    slug: 's01e05',
    title: 'The King of Omashu',
    desc: 'Full English transcript · hover for translation',
  },
]

export function getEpisodeMeta(season: number, episode: number): EpisodeMeta | undefined {
  return EPISODES.find((e) => e.season === season && e.episode === episode)
}
