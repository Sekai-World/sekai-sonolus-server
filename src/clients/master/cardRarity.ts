import { fetchMaster } from './fetch.js'

export type MasterCardRarity = {
    cardRarityType: string
    trainingMaxLevel?: number
}

export const fetchCardRarities = fetchMaster<MasterCardRarity[]>('/cardRarities.json')
