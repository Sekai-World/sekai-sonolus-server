import { Repository } from '../../repository/index.js'
import { updateConfigurationOptions } from './option.js'

export const updateConfiguration = (repository: Repository) => {
    updateConfigurationOptions(repository)
}
