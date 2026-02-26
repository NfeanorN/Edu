import type { EpisodeData } from './episodes'
import s01e05En from './s01e05-en.json'

const s01e05Data: EpisodeData = {
  ...s01e05En,
  source: 'https://transcripts.foreverdreaming.org/viewtopic.php?t=36531',
}

const episodesMap: Record<string, EpisodeData> = {
  '1-5': s01e05Data,
}

export function getEpisodeData(season: number, episode: number): EpisodeData | undefined {
  return episodesMap[`${season}-${episode}`]
}

export { EPISODES, getEpisodeMeta } from './episodes'
export type { EpisodeData, EpisodeMeta, SubtitleEntry } from './episodes'
