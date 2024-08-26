import { fetchI18n } from './fetch.js'

export const fetchMusicTitles = fetchI18n<Record<number, string>>('/music_titles.json')
