import { BackgroundItemModel, filterBackgrounds, paginateItems } from '@sonolus/express'
import { sonolus } from '../index.js'
import { randomizeItems } from '../utils/list.js'
import { hideSpoilers } from '../utils/spoiler.js'
import { backgroundSearches } from './search.js'

export const installBackgroundList = () => {
    sonolus.background.listHandler = ({
        search: { type, options },
        page,
        options: { spoilers },
    }) => {
        const filteredBackgrounds = [
            ...hideSpoilers(
                spoilers.card,
                sonolus.background.items.filter(
                    (item): item is BackgroundItemModel & { meta: object } =>
                        item.meta !== undefined,
                ),
            ),
            ...sonolus.background.items.filter(({ meta }) => !meta),
        ]

        if (type === 'quick')
            return {
                ...paginateItems(filterBackgrounds(filteredBackgrounds, options.keywords), page),
                searches: backgroundSearches,
            }

        if (type === 'others')
            return {
                ...paginateItems(
                    filterBackgrounds(
                        sonolus.background.items.filter(({ meta }) => !meta),
                        options.keywords,
                    ),
                    page,
                ),
                searches: backgroundSearches,
            }

        const items = filterBackgrounds(
            filteredBackgrounds.filter(
                ({ meta }) =>
                    meta &&
                    options.characters[meta.characterIndex] &&
                    options.rarities[meta.rarityIndex] &&
                    options.attributes[meta.attributeIndex] &&
                    options.images[meta.imageType],
            ),
            options.keywords,
        )

        return {
            ...(options.random ? randomizeItems(items) : paginateItems(items, page)),
            searches: backgroundSearches,
        }
    }
}
