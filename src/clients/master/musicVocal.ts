import { MasterCharacterType } from './characterType.js'
import { fetchMaster } from './fetch.js'

export type MasterMusicVocal = {
    id: number
    musicId: number
    musicVocalType: string
    caption: string
    characters: {
        characterType: MasterCharacterType
        characterId: number
    }[]
    assetbundleName: string
}

export const fetchMusicVocals = fetchMaster<MasterMusicVocal[]>('/musicVocals.json')
