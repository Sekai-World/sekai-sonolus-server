import { fetchI18n } from './fetch.js'

export const fetchMusicVocalTypeCaptions = fetchI18n<Record<string, string>>('/music_vocal.json')
