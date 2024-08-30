import { BackgroundItemModel, filterBackgrounds, paginateItems } from '@sonolus/express'
import { sonolus } from '../index.js'
import { randomizeItems, toIndexes } from '../utils/list.js'
import { hideSpoilers } from '../utils/spoiler.js'
import { backgroundSearches } from './search.js'

export const installBackgroundList = () => {
    sonolus.background.listHandler = ({
        search: { type, options },
        page,
        options: serverOptions,
    }) => {
        const filteredBackgrounds = [
            ...hideSpoilers(
                serverOptions.spoilers,
                sonolus.background.items.filter(
                    (item): item is BackgroundItemModel & { meta: {} } => item.meta !== undefined,
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

        const characterIndexes = toIndexes(options.characters)
        const rarityIndexes = toIndexes(options.rarities)
        const attributeIndexes = toIndexes(options.attributes)
        const imageIndexes = toIndexes(options.images)

        const items = filterBackgrounds(
            filteredBackgrounds.filter(
                ({ meta }) =>
                    meta &&
                    characterIndexes.includes(meta.characterIndex) &&
                    rarityIndexes.includes(meta.rarityIndex) &&
                    attributeIndexes.includes(meta.attributeIndex) &&
                    imageIndexes.includes(meta.imageIndex),
            ),
            options.keywords,
        )

        return {
            ...(options.random ? randomizeItems(items) : paginateItems(items, page)),
            searches: backgroundSearches,
        }
    }
}
