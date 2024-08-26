import { fetchMaster } from './fetch.js'

export type MasterCard = {
    id: number
    characterId: number
    cardRarityType: string
    attr: string
    prefix: string
    assetbundleName: string
    releaseAt: number
}

export const fetchCards = fetchMaster<MasterCard[]>('/cards.json')
