import { Icon, Text } from '@sonolus/core'
import { randomize } from '../../utils/math.js'
import { sonolus } from '../index.js'
import { hasMeta, noMeta } from '../utils/meta.js'
import { hideSpoilers } from '../utils/spoiler.js'
import { backgroundSearches } from './search.js'

export const installBackgroundInfo = () => {
    sonolus.background.infoHandler = ({ options: { spoilers } }) => {
        const cardBackgrounds = hideSpoilers(
            spoilers.card,
            sonolus.background.items.filter(hasMeta),
        )
        const otherBackgrounds = sonolus.background.items.filter(noMeta)

        return {
            searches: backgroundSearches,
            sections: [
                {
                    title: { en: Text.Random },
                    icon: Icon.Shuffle,
                    itemType: 'background',
                    items: randomize(cardBackgrounds, 5),
                },
                {
                    title: { en: Text.Newest },
                    itemType: 'background',
                    items: cardBackgrounds.slice(0, 5),
                },
                {
                    title: { en: Text.Others },
                    itemType: 'background',
                    items: otherBackgrounds.slice(0, 5),
                },
            ],
            banner: sonolus.banner,
        }
    }
}
