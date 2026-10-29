import { ServerOptionsModel } from '@sonolus/express'

import { Repository } from '../../repository/index.js'
import { toLocalized } from '../utils/i18n.js'

export const configurationOptions = {
    spoilers: {
        name: {},
        required: false,
        type: 'multi',
        values: {
            music: { title: {}, def: false },
            card: { title: {}, def: false },
        },
    },
} satisfies ServerOptionsModel

export const updateConfigurationOptions = (repository: Repository) => {
    configurationOptions.spoilers.name = toLocalized(repository.commonTexts.spoilerContent)
    configurationOptions.spoilers.values.music.title = toLocalized(repository.commonTexts.music)
    configurationOptions.spoilers.values.card.title = toLocalized(repository.commonTexts.card)
}
