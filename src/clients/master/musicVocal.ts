import { fetchMaster } from './fetch.js'

export type MasterMusicVocal = {
    id: number
    musicId: number
    musicVocalType: string
    caption: string
    characters: {
        characterType: 'game_character' | 'outside_character'
        characterId: number
    }[]
    assetbundleName: string
}

export const fetchMusicVocals = fetchMaster<MasterMusicVocal[]>('/musicVocals.json')
