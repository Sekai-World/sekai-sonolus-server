import { Repository } from '../../repository/index.js'
import { installLevelData } from './data.js'
import { installLevelDetails } from './details.js'
import { installLevelInfo } from './info.js'
import { updateLevelItems } from './item.js'
import { installLevelList } from './list.js'
import { updateLevelSearches } from './search.js'

export const installLevel = () => {
    installLevelInfo()
    installLevelList()
    installLevelDetails()
    installLevelData()
}

export const updateLevel = (repository: Repository) => {
    updateLevelItems(repository)
    updateLevelSearches(repository)
}
