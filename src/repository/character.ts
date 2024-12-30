import { MasterCharacterType } from '../clients/master/characterType.js'
import { fromEntries, mapValues } from '../utils/object.js'
import { RepositoryData } from './data.js'
import { match } from './utils/match.js'
import { merge } from './utils/merge.js'

const separators: Record<string, string> = {
    en: ' ',
    es: ' ',
}

export type CharacterId = `${MasterCharacterType}_${number}`

export const getCharacters = (data: RepositoryData) =>
    fromEntries([
        ...Object.values(
            match(
                merge(data.gameCharacters, 'id', ['firstName', 'givenName']),
                data.characterNames,
                (gameCharacter, locale, characterName) => {
                    gameCharacter.firstName[locale] ??= characterName.firstName
                    gameCharacter.givenName[locale] ??= characterName.givenName
                },
            ),
        ).map(
            (gameCharacter) =>
                [
                    `game_character_${gameCharacter.id}`,
                    {
                        title: mapValues(gameCharacter.givenName, (locale, givenName) =>
                            [gameCharacter.firstName[locale], givenName]
                                .filter(Boolean)
                                .join(separators[locale] ?? ''),
                        ),
                    },
                ] as const,
        ),
        ...Object.values(merge(data.outsideCharacters, 'id', ['name'])).map(
            (outsideCharacter) =>
                [
                    `outside_character_${outsideCharacter.id}`,
                    {
                        title: outsideCharacter.name,
                    },
                ] as const,
        ),
    ])
