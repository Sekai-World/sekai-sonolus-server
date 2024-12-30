import { Repository } from '../../repository/index.js'
import { installPlaylistDetails } from './details.js'
import { installPlaylistInfo } from './info.js'
import { updatePlaylistItems } from './item.js'
import { installPlaylistList } from './list.js'
import { updatePlaylistSearches } from './search.js'

export const installPlaylist = () => {
    installPlaylistInfo()
    installPlaylistList()
    installPlaylistDetails()
}

export const updatePlaylist = (repository: Repository) => {
    updatePlaylistItems(repository)
    updatePlaylistSearches(repository)
}
