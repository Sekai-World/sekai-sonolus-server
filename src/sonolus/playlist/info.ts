import { Icon, Text } from '@sonolus/core'
import { randomize } from '../../utils/math.js'
import { sonolus } from '../index.js'
import { hideSpoilers } from '../utils/spoiler.js'
import { playlistSearches } from './search.js'

export const installPlaylistInfo = () => {
    sonolus.playlist.infoHandler = ({ options }) => {
        return {
            searches: playlistSearches,
            sections: [
                {
                    title: { en: Text.Random },
                    icon: Icon.Shuffle,
                    itemType: 'playlist',
                    items: randomize(hideSpoilers(options.spoilers, sonolus.playlist.items), 5),
                },
                {
                    title: { en: Text.Newest },
                    itemType: 'playlist',
                    items: hideSpoilers(options.spoilers, sonolus.playlist.items).slice(0, 5),
                },
            ],
            banner: sonolus.banner,
        }
    }
}
