import { fetchMaster } from './fetch.js'

export type MasterOutsideCharacter = {
    id: number
    name: string
}

export const fetchOutsideCharacters =
    fetchMaster<MasterOutsideCharacter[]>('/outsideCharacters.json')
