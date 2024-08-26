import { fetchI18n } from './fetch.js'

export type CardTextI18n = {
    tab: {
        'title[0]': string
        'title[2]': string
    }
}

export const fetchCardText = fetchI18n<CardTextI18n>('/card.json')
