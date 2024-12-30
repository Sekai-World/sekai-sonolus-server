import { Icon, Text } from '@sonolus/core'
import { BackgroundItemModel } from '@sonolus/express'
import { randomize } from '../../utils/math.js'
import { sonolus } from '../index.js'
import { nonEmpty } from '../utils/section.js'

export const installBackgroundDetails = () => {
    sonolus.background.detailsHandler = ({ itemName }) => {
        const item = sonolus.background.items.find(({ name }) => name === itemName)
        if (!item) return 404

        return {
            item,
            description: item.description,
            actions: {},
            hasCommunity: false,
            leaderboards: [],
            sections: [getOtherVersions(item), getSameCharacter(item), getRandom(item)].filter(
                nonEmpty,
            ),
        }
    }
}

const getOtherVersions = (item: BackgroundItemModel) => ({
    title: { en: Text.OtherVersions },
    itemType: 'background' as const,
    items: sonolus.background.items.filter(
        (i) => i !== item && i.meta && i.meta.id === item.meta?.id,
    ),
})

const getSameCharacter = (item: BackgroundItemModel) => ({
    title: item.subtitle,
    itemType: 'background' as const,
    items: randomize(
        sonolus.background.items.filter(
            (i) => i !== item && i.meta && i.meta.characterId === item.meta?.characterId,
        ),
        5,
    ),
})

const getRandom = (item: BackgroundItemModel) => ({
    title: { en: Text.Random },
    icon: Icon.Shuffle,
    itemType: 'background' as const,
    items: randomize(
        sonolus.background.items.filter((i) => i !== item && !!i.meta === !!item.meta),
        5,
    ),
})
