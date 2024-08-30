import { PlaylistItemModel } from '@sonolus/express'
import { config } from '../../config.js'
import { sonolus } from '../index.js'

export const updatePlaylistItems = () => {
    const playlists = new Map<number, PlaylistItemModel>()

    for (const level of sonolus.level.items) {
        const playlist = playlists.get(level.meta.musicId)

        if (playlist) {
            playlist.levels.push(level.name)

            if (!playlist.meta.musicVocalTypeIndexes.has(level.meta.musicVocalTypeIndex)) {
                playlist.tags.push({ title: level.meta.musicVocalTypeTitle })
                playlist.meta.musicVocalTypeIndexes.add(level.meta.musicVocalTypeIndex)
            }

            for (const characterIndex of level.meta.characterIndexes) {
                playlist.meta.characterIndexes.add(characterIndex)
            }

            if (level.meta.publishedAt > playlist.meta.publishedAt) {
                playlist.meta.publishedAt = level.meta.publishedAt
            }
        } else {
            playlists.set(level.meta.musicId, {
                name: `${config.sonolus.prefix}-${level.meta.musicId}`,
                version: 1,
                title: level.title,
                subtitle: level.artists,
                author: level.author,
                tags: [{ title: level.meta.musicVocalTypeTitle }],
                description: level.description,
                levels: [level.name],
                meta: {
                    musicVocalTypeIndexes: new Set([level.meta.musicVocalTypeIndex]),
                    characterIndexes: new Set(level.meta.characterIndexes),
                    publishedAt: level.meta.publishedAt,
                },
            })
        }
    }

    sonolus.playlist.items = [...playlists.values()]
}
