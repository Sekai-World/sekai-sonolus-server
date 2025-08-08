import { Icon, Text } from '@sonolus/core'
import { LevelItemModel } from '@sonolus/express'
import { randomize } from '../../utils/math.js'
import { sonolus } from '../index.js'
import { Group } from '../utils/group.js'
import { levels } from './item.js'
import { levelSearches } from './search.js'

const randomLevels: Group<LevelItemModel[]> = [[], []]
const newestLevels: Group<LevelItemModel[]> = [[], []]

export const installLevelInfo = () => {
    sonolus.level.infoHandler = ({ options: { spoilers } }) => ({
        searches: levelSearches,
        sections: [
            {
                title: { en: Text.Random },
                icon: Icon.Shuffle,
                itemType: 'level',
                items: randomize(randomLevels[spoilers.music ? 1 : 0], 5),
            },
            {
                title: { en: Text.Newest },
                itemType: 'level',
                items: newestLevels[spoilers.music ? 1 : 0],
            },
        ],
        banner: sonolus.banner,
    })
}

export const updateLevelInfo = () => {
    for (const i of [0, 1] as const) {
        newestLevels[i].length = 0

        const randomLevelsMap: Record<string, LevelItemModel> = {}
        const newestMusicIds = new Set<number>()
        for (const level of levels[i]) {
            randomLevelsMap[`${level.meta.musicId}-${level.meta.musicVocalId}`] ??= level

            if (newestLevels[i].length >= 5) continue
            if (newestMusicIds.has(level.meta.musicId)) continue

            newestMusicIds.add(level.meta.musicId)
            newestLevels[i].push(level)
        }

        randomLevels[i] = Object.values(randomLevelsMap)
    }
}
