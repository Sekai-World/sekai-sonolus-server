import { MasterDifficulty } from './difficulty.js'
import { fetchMaster } from './fetch.js'

export type MasterMusicDifficulty = {
    id: number
    musicId: number
    musicDifficulty: MasterDifficulty
    playLevel: number
}

export const fetchMusicDifficulties =
    fetchMaster<MasterMusicDifficulty[]>('/musicDifficulties.json')
