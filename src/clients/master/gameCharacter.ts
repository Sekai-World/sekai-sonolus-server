import { fetchMaster } from './fetch.js'

export type MasterGameCharacter = {
    id: number
    firstName?: string
    givenName: string
}

export const fetchGameCharacters = fetchMaster<MasterGameCharacter[]>('/gameCharacters.json')
