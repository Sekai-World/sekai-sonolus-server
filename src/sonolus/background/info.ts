import { Icon, Text } from '@sonolus/core'
import { BackgroundItemModel } from '@sonolus/express'
import { randomize } from '../../utils/math.js'
import { sonolus } from '../index.js'
import { Group, mapGroup } from '../utils/group.js'
import { cardBackgrounds } from './item.js'
import { backgroundSearches } from './search.js'

let newestBackgrounds: Group<BackgroundItemModel[]> = [[], []]
let otherBackgrounds: BackgroundItemModel[] = []

export const installBackgroundInfo = () => {
    sonolus.background.infoHandler = ({ options: { spoilers } }) => ({
        searches: backgroundSearches,
        sections: [
            {
                title: { en: Text.Random },
                icon: Icon.Shuffle,
                itemType: 'background',
                items: randomize(cardBackgrounds[spoilers.card ? 1 : 0], 5),
            },
            {
                title: { en: Text.Newest },
                itemType: 'background',
                items: newestBackgrounds[spoilers.card ? 1 : 0],
            },
            {
                title: { en: Text.Others },
                itemType: 'background',
                items: otherBackgrounds,
            },
        ],
        banner: sonolus.banner,
    })
}

export const updateBackgroundInfo = () => {
    newestBackgrounds = mapGroup(cardBackgrounds, (items) => items.slice(0, 5))
    otherBackgrounds = sonolus.background.items.slice(0, 5)
}
