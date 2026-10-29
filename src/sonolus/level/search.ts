import { Icon, Text } from '@sonolus/core'
import { ServerFormsModel, ServerMultiOptionValueModel } from '@sonolus/express'

import { difficulties } from '../../clients/master/difficulty.js'
import { CharacterId } from '../../repository/character.js'
import { Repository } from '../../repository/index.js'
import { toLocalizedMultiValues, toMultiValues } from '../utils/form.js'
import { levels } from './item.js'

export const levelSearches = {
    advanced: {
        title: Text.Advanced,
        icon: Icon.Advanced,
        requireConfirmation: false,
        options: {
            keywords: {
                name: Text.Keywords,
                required: false,
                type: 'text',
                placeholder: Text.KeywordsPlaceholder,
                def: '',
                limit: 0,
                shortcuts: [],
            },
            random: {
                name: Text.Random,
                required: false,
                type: 'toggle',
                def: false,
            },
            artists: {
                name: Text.Artists,
                required: false,
                type: 'multi',
                values: {} as Record<CharacterId, ServerMultiOptionValueModel>,
            },
            categories: {
                name: Text.Category,
                required: false,
                type: 'multi',
                values: {} as Record<string, ServerMultiOptionValueModel>,
            },
            difficulties: {
                name: Text.Difficulty,
                required: false,
                type: 'multi',
                values: toMultiValues(difficulties),
            },
            minRating: {
                name: Text.RatingMinimum,
                required: false,
                type: 'slider',
                def: 0,
                min: 0,
                max: 0,
                step: 1,
            },
            maxRating: {
                name: Text.RatingMaximum,
                required: false,
                type: 'slider',
                def: 0,
                min: 0,
                max: 0,
                step: 1,
            },
        },
    },
} satisfies ServerFormsModel

export const updateLevelSearches = (repository: Repository) => {
    levelSearches.advanced.options.artists.values = toLocalizedMultiValues(repository.characters)

    levelSearches.advanced.options.categories.values = toMultiValues(repository.musicVocalTypes)

    let minRating = Number.POSITIVE_INFINITY
    let maxRating = Number.NEGATIVE_INFINITY
    for (const level of levels[1]) {
        minRating = Math.min(minRating, level.rating)
        maxRating = Math.max(maxRating, level.rating)
    }
    levelSearches.advanced.options.minRating.min = minRating
    levelSearches.advanced.options.minRating.def = minRating
    levelSearches.advanced.options.minRating.max = maxRating
    levelSearches.advanced.options.maxRating.min = minRating
    levelSearches.advanced.options.maxRating.def = maxRating
    levelSearches.advanced.options.maxRating.max = maxRating
}
