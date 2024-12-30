import { filterBackgrounds, paginateItems } from '@sonolus/express'
import { sonolus } from '../index.js'
import { randomizeItems } from '../utils/list.js'
import { hasMeta, noMeta } from '../utils/meta.js'
import { hideSpoilers } from '../utils/spoiler.js'
import { backgroundSearches } from './search.js'

export const installBackgroundList = () => {
    sonolus.background.listHandler = ({
        search: { type, options },
        page,
        options: { spoilers },
    }) => {
        const filteredBackgrounds = [
            ...hideSpoilers(spoilers.card, sonolus.background.items.filter(hasMeta)),
            ...sonolus.background.items.filter(noMeta),
        ]

        if (type === 'quick')
            return {
                ...paginateItems(filterBackgrounds(filteredBackgrounds, options.keywords), page),
                searches: backgroundSearches,
            }

        if (type === 'others')
            return {
                ...paginateItems(
                    filterBackgrounds(sonolus.background.items.filter(noMeta), options.keywords),
                    page,
                ),
                searches: backgroundSearches,
            }

        const items = filterBackgrounds(
            filteredBackgrounds.filter(
                ({ meta }) =>
                    meta &&
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
