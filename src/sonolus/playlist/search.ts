import { Icon, Text } from '@sonolus/core'
import { ServerFormsModel, ServerMultiOptionValueModel } from '@sonolus/express'
import { CharacterId } from '../../repository/character.js'
import { Repository } from '../../repository/index.js'
import { sonolus } from '../index.js'
import { toMultiValues } from '../utils/form.js'

export const playlistSearches = {
    advanced: {
        title: { en: Text.Advanced },
        icon: Icon.Advanced,
        requireConfirmation: false,
        options: {
            keywords: {
                name: { en: Text.Keywords },
                required: false,
                type: 'text',
                placeholder: { en: Text.KeywordsPlaceholder },
                def: '',
                limit: 0,
                shortcuts: [],
            },
            random: {
                name: { en: Text.Random },
                required: false,
                type: 'toggle',
                def: false,
            },
            artists: {
                name: { en: Text.Artists },
                required: false,
                type: 'multi',
                values: {} as Record<CharacterId, ServerMultiOptionValueModel>,
            },
            categories: {
                name: { en: Text.Category },
                required: false,
                type: 'multi',
                values: {} as Record<string, ServerMultiOptionValueModel>,
            },
        },
    },
    random: {
        title: { en: Text.Random },
        icon: Icon.Shuffle,
        requireConfirmation: false,
        options: {
            minRating: {
                name: { en: Text.RatingMinimum },
                required: false,
                type: 'slider',
                def: 0,
                min: 0,
                max: 0,
                step: 1,
            },
            maxRating: {
                name: { en: Text.RatingMaximum },
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

export const updatePlaylistSearches = (repository: Repository) => {
    playlistSearches.advanced.options.artists.values = toMultiValues(repository.characters)

    playlistSearches.advanced.options.categories.values = toMultiValues(repository.musicVocalTypes)

    let minRating = Number.POSITIVE_INFINITY
    let maxRating = Number.NEGATIVE_INFINITY
    for (const level of sonolus.level.items) {
        minRating = Math.min(minRating, level.rating)
        maxRating = Math.max(maxRating, level.rating)
    }
    playlistSearches.random.options.minRating.min = minRating
    playlistSearches.random.options.minRating.def = minRating
    playlistSearches.random.options.minRating.max = maxRating
    playlistSearches.random.options.maxRating.min = minRating
    playlistSearches.random.options.maxRating.def = maxRating
    playlistSearches.random.options.maxRating.max = maxRating
}
