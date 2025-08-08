import { Icon, Text } from '@sonolus/core'
import { PlaylistItemModel } from '@sonolus/express'
import { randomize } from '../../utils/math.js'
import { sonolus } from '../index.js'
import { Group, mapGroup } from '../utils/group.js'
import { playlists } from './item.js'
import { playlistSearches } from './search.js'

let newestPlaylists: Group<PlaylistItemModel[]> = [[], []]

export const installPlaylistInfo = () => {
    sonolus.playlist.infoHandler = ({ options: { spoilers } }) => ({
        searches: playlistSearches,
        sections: [
            {
                title: { en: Text.Random },
                icon: Icon.Shuffle,
                itemType: 'playlist',
                items: randomize(playlists[spoilers.music ? 1 : 0], 5),
            },
            {
                title: { en: Text.Newest },
                itemType: 'playlist',
                items: newestPlaylists[spoilers.music ? 1 : 0],
            },
        ],
        banner: sonolus.banner,
    })
}

export const updatePlaylistInfo = () => {
    newestPlaylists = mapGroup(playlists, (items) => items.slice(0, 5))
}
