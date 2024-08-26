import { Icon, Text } from '@sonolus/core'
import { randomize } from '../../utils/math.js'
import { sonolus } from '../index.js'
import { backgroundSearches } from './search.js'

export const installBackgroundInfo = () => {
    sonolus.background.infoHandler = () => {
        const cardBackgrounds = sonolus.background.items.filter(({ meta }) => meta)
        const otherBackgrounds = sonolus.background.items.filter(({ meta }) => !meta)

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
