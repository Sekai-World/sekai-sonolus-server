import { filterLevels, paginateItems } from '@sonolus/express'
import { sonolus } from '../index.js'
import { randomizeItems } from '../utils/list.js'
import { levels } from './item.js'
import { levelSearches } from './search.js'

export const installLevelList = () => {
    sonolus.level.listHandler = ({ search: { type, options }, page, options: { spoilers } }) => {
        if (type === 'quick')
            return {
                ...paginateItems(
                    filterLevels(levels[spoilers.music ? 1 : 0], options.keywords),
                    page,
                ),
                searches: levelSearches,
            }

        const items = filterLevels(
            levels[spoilers.music ? 1 : 0].filter(
                ({ rating, meta }) =>
                    (!meta.characterIds.length ||
                        meta.characterIds.some((characterId) => options.artists[characterId])) &&
                    options.categories[meta.musicVocalType] &&
                    options.difficulties[meta.difficulty] &&
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
