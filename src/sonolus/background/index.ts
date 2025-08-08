import { Repository } from '../../repository/index.js'
import { installBackgroundDetails, updateBackgroundDetails } from './details.js'
import { installBackgroundInfo, updateBackgroundInfo } from './info.js'
import { updateBackgroundItems } from './item.js'
import { installBackgroundList, updateBackgroundList } from './list.js'
import { updateBackgroundSearches } from './search.js'

export const installBackground = () => {
    installBackgroundInfo()
    installBackgroundList()
    installBackgroundDetails()
}

export const updateBackground = (repository: Repository) => {
    updateBackgroundItems(repository)
    updateBackgroundSearches(repository)
    updateBackgroundInfo()
    updateBackgroundList()
    updateBackgroundDetails()
}
