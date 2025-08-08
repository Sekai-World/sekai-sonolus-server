import { BackgroundItemModel, filterBackgrounds, paginateItems } from '@sonolus/express'
import { sonolus } from '../index.js'
import { Group, mapGroup } from '../utils/group.js'
import { randomizeItems } from '../utils/list.js'
import { cardBackgrounds } from './item.js'
import { backgroundSearches } from './search.js'

let allBackgrounds: Group<BackgroundItemModel[]> = [[], []]

export const installBackgroundList = () => {
    sonolus.background.listHandler = ({
        search: { type, options },
        page,
        options: { spoilers },
    }) => {
        if (type === 'quick')
            return {
                ...paginateItems(
                    filterBackgrounds(allBackgrounds[spoilers.card ? 1 : 0], options.keywords),
                    page,
                ),
                searches: backgroundSearches,
            }

        if (type === 'others')
            return {
                ...paginateItems(
                    filterBackgrounds(sonolus.background.items, options.keywords),
                    page,
                ),
                searches: backgroundSearches,
            }

        const items = filterBackgrounds(
            cardBackgrounds[spoilers.card ? 1 : 0].filter(
                ({ meta }) =>
                    options.characters[meta.characterId] &&
                    options.rarities[meta.rarity] &&
                    options.attributes[meta.attribute] &&
                    options.images[meta.image],
            ),
            options.keywords,
        )

        return {
            ...(options.random ? randomizeItems(items) : paginateItems(items, page)),
            searches: backgroundSearches,
        }
    }
}

export const updateBackgroundList = () => {
    allBackgrounds = mapGroup(cardBackgrounds, (backgrounds) => [
        ...backgrounds,
        ...sonolus.background.items,
    ])
}
