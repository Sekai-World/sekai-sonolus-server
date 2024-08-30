import { ServerMultiOptionValueModel, ServerOptionsModel } from '@sonolus/express'
import { Repository } from '../../repository/index.js'

export const configurationOptions = {
    spoilers: {
        name: {},
        required: false,
        type: 'multi',
        values: [] as ServerMultiOptionValueModel[],
    },
} satisfies ServerOptionsModel

export const updateConfigurationOptions = (repository: Repository) => {
    configurationOptions.spoilers.name = repository.commonTexts.spoilerContent
    configurationOptions.spoilers.values = [
        { title: repository.commonTexts.music, def: false },
        { title: repository.commonTexts.card, def: false },
    ]
}
