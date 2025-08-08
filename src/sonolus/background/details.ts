import { Icon, Text } from '@sonolus/core'
import { BackgroundItemModel } from '@sonolus/express'
import { randomize } from '../../utils/math.js'
import { sonolus } from '../index.js'
import { Group } from '../utils/group.js'
import { HasMeta } from '../utils/meta.js'
import { nonEmpty } from '../utils/section.js'
import { cardBackgrounds, cardBackgroundsMap } from './item.js'

const indexes: Group<{
    otherVersions: Map<number, HasMeta<BackgroundItemModel>[]>
    sameCharacter: Map<string, HasMeta<BackgroundItemModel>[]>
}> = [
    {
        otherVersions: new Map(),
        sameCharacter: new Map(),
    },
    {
        otherVersions: new Map(),
        sameCharacter: new Map(),
    },
]

export const installBackgroundDetails = () => {
    sonolus.background.detailsHandler = ({ itemName, options: { spoilers } }) => {
        const cardItem = cardBackgroundsMap.get(itemName)
        if (cardItem)
            return {
                item: cardItem,
                description: cardItem.description,
                actions: {},
                hasCommunity: false,
                leaderboards: [],
                sections: [
                    getOtherVersions(spoilers.card, cardItem),
                    getSameCharacter(spoilers.card, cardItem),
                    getRandom(spoilers.card, cardItem),
                ].filter(nonEmpty),
            }

        const otherItem = sonolus.background.items.find(({ name }) => name === itemName)
        if (!otherItem) return 404

        return {
            item: otherItem,
            description: otherItem.description,
            actions: {},
            hasCommunity: false,
            leaderboards: [],
            sections: [
                {
                    title: { en: Text.Random },
                    icon: Icon.Shuffle,
                    itemType: 'background',
                    items: randomize(
                        sonolus.background.items.filter((i) => i !== otherItem),
                        5,
                    ),
                },
            ],
        }
    }
}

const getOtherVersions = (spoiler: boolean, item: HasMeta<BackgroundItemModel>) => ({
    title: { en: Text.OtherVersions },
    itemType: 'background' as const,
    items:
        indexes[spoiler ? 1 : 0].otherVersions
            .get(item.meta.id)
            ?.filter((i) => i.name !== item.name) ?? [],
})

const getSameCharacter = (spoiler: boolean, item: HasMeta<BackgroundItemModel>) => ({
    title: item.subtitle,
    itemType: 'background' as const,
    items: randomize(
        indexes[spoiler ? 1 : 0].sameCharacter
            .get(item.meta.characterId)
            ?.filter((i) => i.name !== item.name) ?? [],
        5,
    ),
})

const getRandom = (spoiler: boolean, item: HasMeta<BackgroundItemModel>) => ({
    title: { en: Text.Random },
    icon: Icon.Shuffle,
    itemType: 'background' as const,
    items: randomize(
        cardBackgrounds[spoiler ? 1 : 0].filter((i) => i.name !== item.name),
        5,
    ),
})

export const updateBackgroundDetails = () => {
    for (const i of [0, 1] as const) {
        indexes[i].otherVersions.clear()
        indexes[i].sameCharacter.clear()

        for (const background of cardBackgrounds[i]) {
            addToIndex(indexes[i].otherVersions, background.meta.id, background)
            addToIndex(indexes[i].sameCharacter, background.meta.characterId, background)
        }
    }
}

const addToIndex = <K>(
    index: Map<K, HasMeta<BackgroundItemModel>[]>,
    key: K,
    background: HasMeta<BackgroundItemModel>,
) => {
    const levels = index.get(key)
    if (levels) {
        levels.push(background)
    } else {
        index.set(key, [background])
    }
}
