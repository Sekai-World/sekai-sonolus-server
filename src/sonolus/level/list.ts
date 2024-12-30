import { filterLevels, paginateItems } from '@sonolus/express'
import { sonolus } from '../index.js'
import { randomizeItems } from '../utils/list.js'
import { hideSpoilers } from '../utils/spoiler.js'
import { levelSearches } from './search.js'

export const installLevelList = () => {
    sonolus.level.listHandler = ({ search: { type, options }, page, options: { spoilers } }) => {
        const filteredLevels = hideSpoilers(spoilers.music, sonolus.level.items)

        if (type === 'quick')
            return {
                ...paginateItems(filterLevels(filteredLevels, options.keywords), page),
                searches: levelSearches,
            }

        const items = filterLevels(
            filteredLevels.filter(
                ({ rating, meta }) =>
                    (!meta.characterIndexes.length ||
                        meta.characterIndexes.some(
                            (characterIndex) => options.artists[characterIndex],
                        )) &&
                    options.categories[meta.musicVocalTypeIndex] &&
                    options.difficulties[meta.difficultyIndex] &&
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
