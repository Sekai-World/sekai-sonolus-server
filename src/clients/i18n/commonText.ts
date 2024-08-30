import { fetchI18n } from './fetch.js'

export type CommonTextI18n = {
    music: string
    character: string
    rarity: string
    attribute: string
    card: string
    spoilerContent: string
}

export const fetchCommonText = fetchI18n<CommonTextI18n>('/common.json')
