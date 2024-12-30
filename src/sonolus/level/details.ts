import { Icon, Text } from '@sonolus/core'
import { LevelItemModel } from '@sonolus/express'
import { randomize } from '../../utils/math.js'
import { sonolus } from '../index.js'
import { nonEmpty } from '../utils/section.js'

export const installLevelDetails = () => {
    sonolus.level.detailsHandler = ({ itemName }) => {
        const item = sonolus.level.items.find(({ name }) => name === itemName)
        if (!item) return 404

        return {
            item,
            description: item.description,
            actions: {},
            hasCommunity: false,
            leaderboards: [],
            sections: [
                getOtherDifficulties(item),
                getOtherVersions(item),
                getSameArtists(item),
                getRandom(item),
            ].filter(nonEmpty),
        }
    }
}

const getOtherDifficulties = (item: LevelItemModel) => ({
    title: { en: Text.OtherDifficulties },
    itemType: 'level' as const,
    items: sonolus.level.items.filter(
        (i) =>
            i.meta.musicId === item.meta.musicId &&
            i.meta.musicVocalId === item.meta.musicVocalId &&
            i.meta.difficulty !== item.meta.difficulty,
    ),
})

const getOtherVersions = (item: LevelItemModel) => ({
    title: { en: Text.OtherVersions },
    itemType: 'level' as const,
    items: sonolus.level.items.filter(
        (i) =>
            i !== item &&
            i.meta.musicId === item.meta.musicId &&
            i.meta.difficulty === item.meta.difficulty,
    ),
})

const getSameArtists = (item: LevelItemModel) => ({
    title: { en: Text.SameArtists },
    itemType: 'level' as const,
    items: randomize(
        sonolus.level.items.filter(
            (i) =>
                i.meta.musicId !== item.meta.musicId &&
                i.meta.difficulty === item.meta.difficulty &&
                i.meta.characterIds.join(',') === item.meta.characterIds.join(','),
        ),
        5,
    ),
})

const getRandom = (item: LevelItemModel) => ({
    title: { en: Text.Random },
    icon: Icon.Shuffle,
    itemType: 'level' as const,
    items: randomize(
        sonolus.level.items.filter((i) => i !== item && i.meta.difficulty === item.meta.difficulty),
        5,
    ),
})
