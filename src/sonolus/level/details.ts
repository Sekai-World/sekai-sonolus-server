import { Icon, Text } from '@sonolus/core'
import { LevelItemModel } from '@sonolus/express'
import { randomize } from '../../utils/math.js'
import { sonolus } from '../index.js'
import { Group } from '../utils/group.js'
import { nonEmpty } from '../utils/section.js'
import { levels, levelsMap } from './item.js'

const indexes: Group<{
    otherDifficulties: Map<string, LevelItemModel[]>
    otherVersions: Map<string, LevelItemModel[]>
    sameArtists: Map<string, LevelItemModel[]>
    random: Map<string, LevelItemModel[]>
}> = [
    {
        otherDifficulties: new Map(),
        otherVersions: new Map(),
        sameArtists: new Map(),
        random: new Map(),
    },
    {
        otherDifficulties: new Map(),
        otherVersions: new Map(),
        sameArtists: new Map(),
        random: new Map(),
    },
]

export const installLevelDetails = () => {
    sonolus.level.detailsHandler = ({ itemName, options: { spoilers } }) => {
        const item = levelsMap.get(itemName)
        if (!item) return 404

        return {
            item,
            description: item.description,
            actions: {},
            hasCommunity: false,
            leaderboards: [],
            sections: [
                getOtherDifficulties(spoilers.music, item),
                getOtherVersions(spoilers.music, item),
                getSameArtists(spoilers.music, item),
                getRandom(spoilers.music, item),
            ].filter(nonEmpty),
        }
    }
}

const getOtherDifficulties = (spoiler: boolean, item: LevelItemModel) => ({
    title: { en: Text.OtherDifficulties },
    itemType: 'level' as const,
    items:
        indexes[spoiler ? 1 : 0].otherDifficulties
            .get(`${item.meta.musicId}-${item.meta.musicVocalId}`)
            ?.filter((i) => i.meta.difficulty !== item.meta.difficulty) ?? [],
})

const getOtherVersions = (spoiler: boolean, item: LevelItemModel) => ({
    title: { en: Text.OtherVersions },
    itemType: 'level' as const,
    items:
        indexes[spoiler ? 1 : 0].otherVersions
            .get(`${item.meta.musicId}-${item.meta.difficulty}`)
            ?.filter((i) => i.meta.musicVocalId !== item.meta.musicVocalId) ?? [],
})

const getSameArtists = (spoiler: boolean, item: LevelItemModel) => ({
    title: { en: Text.SameArtists },
    itemType: 'level' as const,
    items: randomize(
        indexes[spoiler ? 1 : 0].sameArtists
            .get(`${item.meta.characters}-${item.meta.difficulty}`)
            ?.filter((i) => i.meta.musicId !== item.meta.musicId) ?? [],
        5,
    ),
})

const getRandom = (spoiler: boolean, item: LevelItemModel) => ({
    title: { en: Text.Random },
    icon: Icon.Shuffle,
    itemType: 'level' as const,
    items: randomize(
        indexes[spoiler ? 1 : 0].random
            .get(item.meta.difficulty)
            ?.filter((i) => i.name !== item.name) ?? [],
        5,
    ),
})

export const updateLevelDetails = () => {
    for (const i of [0, 1] as const) {
        indexes[i].otherDifficulties.clear()
        indexes[i].otherVersions.clear()
        indexes[i].sameArtists.clear()
        indexes[i].random.clear()

        for (const level of levels[i]) {
            addToIndex(
                indexes[i].otherDifficulties,
                `${level.meta.musicId}-${level.meta.musicVocalId}`,
                level,
            )
            addToIndex(
                indexes[i].otherVersions,
                `${level.meta.musicId}-${level.meta.difficulty}`,
                level,
            )
            addToIndex(
                indexes[i].sameArtists,
                `${level.meta.characters}-${level.meta.difficulty}`,
                level,
            )
            addToIndex(indexes[i].random, level.meta.difficulty, level)
        }
    }
}

const addToIndex = (index: Map<string, LevelItemModel[]>, key: string, level: LevelItemModel) => {
    const levels = index.get(key)
    if (levels) {
        levels.push(level)
    } else {
        index.set(key, [level])
    }
}
