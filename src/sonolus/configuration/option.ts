import { ServerOptionsModel } from '@sonolus/express'
import { Repository } from '../../repository/index.js'

export const configurationOptions = {
    spoilers: {
        name: {},
        required: false,
        type: 'toggle',
        def: false,
    },
} satisfies ServerOptionsModel

export const updateConfigurationOptions = (repository: Repository) => {
    configurationOptions.spoilers.name = repository.commonTexts.spoilerContent
}
