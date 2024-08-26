import { Repository } from '../../repository/index.js'
import { installBackgroundDetails } from './details.js'
import { installBackgroundInfo } from './info.js'
import { updateBackgroundItems } from './item.js'
import { installBackgroundList } from './list.js'
import { updateBackgroundSearches } from './search.js'

export const installBackground = () => {
    installBackgroundInfo()
    installBackgroundList()
    installBackgroundDetails()
}

export const updateBackground = (repository: Repository) => {
    updateBackgroundItems(repository)
    updateBackgroundSearches(repository)
}
