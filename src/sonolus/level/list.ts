import { filterLevels, paginateItems } from '@sonolus/express'
import { sonolus } from '../index.js'
import { randomizeItems, toIndexes } from '../utils/list.js'
import { levelSearches } from './search.js'

export const installLevelList = () => {
    sonolus.level.listHandler = ({ search: { type, options }, page }) => {
        if (type === 'quick')
            return {
                ...paginateItems(filterLevels(sonolus.level.items, options.keywords), page),
                searches: levelSearches,
            }

        const characterIndexes = toIndexes(options.artists)
        const musicVocalIndexes = toIndexes(options.categories)
        const difficultyIndexes = toIndexes(options.difficulties)

        const items = filterLevels(
            sonolus.level.items.filter(
                ({ rating, meta }) =>
                    (!meta.characterIndexes.length ||
                        meta.characterIndexes.some((characterIndex) =>
                            characterIndexes.includes(characterIndex),
                        )) &&
                    musicVocalIndexes.includes(meta.musicVocalTypeIndex) &&
                    difficultyIndexes.includes(meta.difficultyIndex) &&
                    rating >= options.minRating &&
                    rating <= options.maxRating,
            ),
            options.keywords,
        )

        return {
            ...(options.random ? randomizeItems(items) : paginateItems(items, page)),
            searches: levelSearches,
        }
    }
}
