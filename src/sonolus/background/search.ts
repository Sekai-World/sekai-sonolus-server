import { Text } from '@sonolus/core'
import { ServerFormsModel, ServerMultiOptionValueModel } from '@sonolus/express'
import { Repository } from '../../repository/index.js'
import { toOptionValues } from '../utils/form.js'

export const backgroundSearches = {
    card: {
        title: {},
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
            characters: {
                name: {},
                required: false,
                type: 'multi',
                values: {} as Record<string, ServerMultiOptionValueModel>,
            },
            rarities: {
                name: {},
                required: false,
                type: 'multi',
                values: {} as Record<string, ServerMultiOptionValueModel>,
            },
            attributes: {
                name: {},
                required: false,
                type: 'multi',
                values: {} as Record<string, ServerMultiOptionValueModel>,
            },
            images: {
                name: {},
                required: false,
                type: 'multi',
                values: {
                    normal: { title: {}, def: true },
                    trained: { title: {}, def: true },
                },
            },
        },
    },
    others: {
        title: { en: Text.Others },
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
        },
    },
} satisfies ServerFormsModel

export const updateBackgroundSearches = (repository: Repository) => {
    backgroundSearches.card.title = repository.commonTexts.card

    backgroundSearches.card.options.characters.name = repository.commonTexts.character
    backgroundSearches.card.options.characters.values = toOptionValues(repository.characters)

    backgroundSearches.card.options.rarities.name = repository.commonTexts.rarity
    backgroundSearches.card.options.rarities.values = toOptionValues(repository.cardRarities)

    backgroundSearches.card.options.attributes.name = repository.commonTexts.attribute
    backgroundSearches.card.options.attributes.values = toOptionValues(repository.attributes)

    backgroundSearches.card.options.images.name = repository.commonTexts.card
    backgroundSearches.card.options.images.values.normal.title = repository.cardTexts.normal
    backgroundSearches.card.options.images.values.trained.title = repository.cardTexts.trained
}
