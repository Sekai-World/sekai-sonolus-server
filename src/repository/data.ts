import { fetchCardPrefixes } from '../clients/i18n/cardPrefix.js'
import { fetchCardText } from '../clients/i18n/cardText.js'
import { fetchCharacterNames } from '../clients/i18n/characterName.js'
import { fetchCommonText } from '../clients/i18n/commonText.js'
import { fetchI18ns } from '../clients/i18n/fetch.js'
import { fetchMusicTitles } from '../clients/i18n/musicTitle.js'
import { fetchMusicVocalTypeCaptions } from '../clients/i18n/musicVocalTypeCaption.js'
import { fetchCards } from '../clients/master/card.js'
import { fetchCardRarities } from '../clients/master/cardRarity.js'
import { fetchMasters } from '../clients/master/fetch.js'
import { fetchGameCharacters } from '../clients/master/gameCharacter.js'
import { fetchMusics } from '../clients/master/music.js'
import { fetchMusicDifficulties } from '../clients/master/musicDifficulty.js'
import { fetchMusicVocals } from '../clients/master/musicVocal.js'
import { fetchOutsideCharacters } from '../clients/master/outsideCharacter.js'
import { allObject } from '../utils/promise.js'

export const fetchRepositoryData = () =>
    allObject({
        commonTexts: fetchI18ns(fetchCommonText),
        gameCharacters: fetchMasters(fetchGameCharacters),
        outsideCharacters: fetchMasters(fetchOutsideCharacters),
        characterNames: fetchI18ns(fetchCharacterNames),
        cards: fetchMasters(fetchCards),
        cardPrefixes: fetchI18ns(fetchCardPrefixes),
        cardRarities: fetchMasters(fetchCardRarities),
        cardTexts: fetchI18ns(fetchCardText),
        musics: fetchMasters(fetchMusics),
        musicTitles: fetchI18ns(fetchMusicTitles),
        musicVocals: fetchMasters(fetchMusicVocals),
        musicVocalTypeCaptions: fetchI18ns(fetchMusicVocalTypeCaptions),
        musicDifficulties: fetchMasters(fetchMusicDifficulties),
    })

export type RepositoryData = Awaited<ReturnType<typeof fetchRepositoryData>>
