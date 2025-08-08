import { PlaylistItemModel } from '@sonolus/express'
import { config } from '../../config.js'
import { Repository } from '../../repository/index.js'
import { levels } from '../level/item.js'
import { Group } from '../utils/group.js'

export const playlists: Group<PlaylistItemModel[]> = [[], []]
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const playlistsMap: Group<Map<string, PlaylistItemModel>> = [new Map(), new Map()]

export const updatePlaylistItems = (repository: Repository) => {
    playlistsMap[1].clear()

    for (const level of levels[1]) {
        const name = `${config.sonolus.prefix}-${level.meta.musicId}`

        const musicVocalTypeTitle = repository.musicVocalTypes[level.meta.musicVocalType]
            ?.title ?? { en: level.meta.musicVocalType }

        const playlist = playlistsMap[1].get(name)
        if (playlist) {
            playlist.levels.push(level)

            if (!playlist.meta.musicVocalTypes.has(level.meta.musicVocalType)) {
                playlist.tags.push({ title: musicVocalTypeTitle })
                playlist.meta.musicVocalTypes.add(level.meta.musicVocalType)
            }

            for (const characterId of level.meta.characterIds) {
                playlist.meta.characterIds.add(characterId)
            }

            if (level.meta.publishedAt < playlist.meta.publishedAt) {
                playlist.meta.publishedAt = level.meta.publishedAt
            }
        } else {
            playlistsMap[1].set(name, {
                name,
                version: 1,
                title: level.title,
                subtitle: level.artists,
                author: level.author,
                tags: [{ title: musicVocalTypeTitle }],
                description: level.description,
                levels: [level],
                meta: {
                    musicVocalTypes: new Set([level.meta.musicVocalType]),
                    characterIds: new Set(level.meta.characterIds),
                    publishedAt: level.meta.publishedAt,
                },
            })
        }
    }

    playlists[1] = [...playlistsMap[1].values()]

    playlistsMap[0].clear()
    for (const playlist of playlists[1]) {
        playlistsMap[0].set(playlist.name, {
            ...playlist,
            levels: playlist.levels.filter(
                (item) => typeof item === 'object' && item.meta.publishedAt <= Date.now(),
            ),
        })
    }

    playlists[0] = [...playlistsMap[0].values()].filter((item) => item.levels.length)
}
