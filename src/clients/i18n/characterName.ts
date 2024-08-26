import { fetchI18n } from './fetch.js'

export type CharacterNameI18n = {
    firstName?: string
    givenName: string
}

export const fetchCharacterNames =
    fetchI18n<Record<number, CharacterNameI18n>>('/character_name.json')
