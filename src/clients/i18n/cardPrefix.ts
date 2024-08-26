import { fetchI18n } from './fetch.js'

export const fetchCardPrefixes = fetchI18n<Record<number, string>>('/card_prefix.json')
