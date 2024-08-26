import { Icon, Text } from '@sonolus/core'
import { randomize } from '../../utils/math.js'
import { sonolus } from '../index.js'
import { playlistSearches } from './search.js'

export const installPlaylistInfo = () => {
    sonolus.playlist.infoHandler = () => {
        return {
            searches: playlistSearches,
            sections: [
                {
                    title: { en: Text.Random },
                    icon: Icon.Shuffle,
                    itemType: 'playlist',
                    items: randomize(sonolus.playlist.items, 5),
                },
                {
                    title: { en: Text.Newest },
                    itemType: 'playlist',
                    items: sonolus.playlist.items.slice(0, 5),
                },
            ],
            banner: sonolus.banner,
        }
    }
}
