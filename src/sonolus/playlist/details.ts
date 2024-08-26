import { Icon, Text } from '@sonolus/core'
import { PlaylistItemModel } from '@sonolus/express'
import { databaseEngineItem } from 'sonolus-pjsekai-engine'
import { config } from '../../config.js'
import { randomize } from '../../utils/math.js'
import { sonolus } from '../index.js'
import { nonEmpty } from '../utils/section.js'

export const installPlaylistDetails = () => {
    sonolus.playlist.detailsHandler = ({ itemName }) => {
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
                    author: databaseEngineItem.subtitle,
                    tags: [{ title: { en: Text.Random } }],
                    levels: randomize(
                        sonolus.level.items
                            .filter(({ rating }) => rating >= minRating && rating <= maxRating)
                            .map(({ name }) => name),
                        20,
                    ),
                    meta: {
                        musicVocalTypeIndexes: new Set(),
                        characterIndexes: new Set(),
                    },
                },
                actions: {},
                hasCommunity: false,
                leaderboards: [],
                sections: [],
            }
        }

        const item = sonolus.playlist.items.find(({ name }) => name === itemName)
        if (!item) return 404

        return {
            item,
            description: item.description,
            actions: {},
            hasCommunity: false,
            leaderboards: [],
            sections: [getRandom(item)].filter(nonEmpty),
        }
    }
}

const getRandom = (item: PlaylistItemModel) => ({
    title: { en: Text.Random },
    icon: Icon.Shuffle,
    itemType: 'playlist' as const,
    items: randomize(
        sonolus.playlist.items.filter((i) => i !== item),
        5,
    ),
})
