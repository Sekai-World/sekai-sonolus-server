import { getMusicBgmPath, getMusicChartPath } from '../clients/asset/music.js'
import { fetchWhitelist } from '../clients/whitelist.js'
import { getAttributes } from './attribute.js'
import { getCards } from './card.js'
import { getCardRarities } from './cardRarity.js'
import { getCardTexts } from './cardText.js'
import { getCharacters } from './character.js'
import { getCommonTexts } from './commonText.js'
import { fetchRepositoryData } from './data.js'
import { getMusics } from './music.js'
import { getMusicDifficulties } from './musicDifficulty.js'
import { getMusicVocals } from './musicVocal.js'
import { getMusicVocalTypes } from './musicVocalType.js'

export const fetchRepository = async () => {
    const data = await fetchRepositoryData()

    const musicVocals = getMusicVocals(data)
    const musicDifficulties = getMusicDifficulties(data)

    const whitelist = await fetchWhitelist([
        ...Object.values(musicVocals).map(({ server, assetbundleName }) => ({
            server,
            path: getMusicBgmPath(assetbundleName),
        })),
        ...Object.values(musicDifficulties).map(({ server, musicId, musicDifficulty }) => ({
            server,
            path: getMusicChartPath(musicId, musicDifficulty),
        })),
    ])

    return {
        commonTexts: getCommonTexts(data),
        characters: getCharacters(data),
        cards: getCards(data),
        cardRarities: getCardRarities(data),
        attributes: getAttributes(data),
        cardTexts: getCardTexts(data),
        musics: getMusics(data),
        musicVocals,
        musicVocalTypes: getMusicVocalTypes(data),
        musicDifficulties,
        whitelist,
    }
}

export type Repository = Awaited<ReturnType<typeof fetchRepository>>
