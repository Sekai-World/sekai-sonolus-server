import { Icon, Text } from '@sonolus/core'
import { PlaylistItemModel } from '@sonolus/express'
import { config } from '../../config.js'
import { randomize } from '../../utils/math.js'
import { sonolus } from '../index.js'
import { levels } from '../level/item.js'
import { nonEmpty } from '../utils/section.js'
import { sekaiText } from '../utils/sekai.js'
import { playlists, playlistsMap } from './item.js'

export const installPlaylistDetails = () => {
    sonolus.playlist.detailsHandler = ({ itemName, options: { spoilers } }) => {
        if (itemName.startsWith(`${config.sonolus.prefix}-random-`)) {
            const [, , , min, max] = itemName.split('-')
            const minRating = +(min ?? '') || 0
            const maxRating = +(max ?? '') || 0

            return {
                item: {
                    name: itemName,
                    version: 1,
                    title: { en: `${minRating} - ${maxRating}` },
                    subtitle: {},
                    author: sekaiText,
                    tags: [{ title: { en: Text.Random } }],
                    levels: randomize(
                        levels[spoilers.music ? 1 : 0].filter(
                            ({ rating }) => rating >= minRating && rating <= maxRating,
                        ),
                        20,
                    ),
                    meta: {
                        musicVocalTypes: new Set(),
                        characterIds: new Set(),
                        publishedAt: Date.now(),
                    },
                },
                actions: {},
                hasCommunity: false,
                leaderboards: [],
                sections: [],
            }
        }

        const item = playlistsMap[spoilers.music ? 1 : 0].get(itemName)
        if (!item) return 404

        return {
            item,
            description: item.description,
            actions: {},
            hasCommunity: false,
            leaderboards: [],
            sections: [getRandom(spoilers.music, item)].filter(nonEmpty),
        }
    }
}

const getRandom = (spoiler: boolean, item: PlaylistItemModel) => ({
    title: { en: Text.Random },
    icon: Icon.Shuffle,
    itemType: 'playlist' as const,
    items: randomize(
        playlists[spoiler ? 1 : 0].filter((i) => i.name !== item.name),
        5,
    ),
})
