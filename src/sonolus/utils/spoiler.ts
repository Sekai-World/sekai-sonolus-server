import { PlaylistItemModel } from '@sonolus/express'
import { sonolus } from '../index.js'

export const hideSpoilers = <T extends { meta: { publishedAt: number } }>(
    passThrough: boolean,
    items: T[],
): T[] => {
    if (passThrough) {
        return items
    }
    return items.filter((item) => item.meta.publishedAt <= Date.now())
}

export const hideSpoilersFromPlaylist = (
    passThrough: boolean,
    playlist: PlaylistItemModel,
): PlaylistItemModel => {
    if (passThrough) {
        return playlist
    }
    return {
        ...playlist,
        levels: hideSpoilers(
            false,
            playlist.levels.map((levelNameOrItem) => {
                if (typeof levelNameOrItem === 'object') return levelNameOrItem
                const level = sonolus.level.items.find((level) => level.name === levelNameOrItem)
                if (!level) throw new Error(`Level not found: ${String(levelNameOrItem)}`)
                return level
            }),
        ),
    }
}

export const hideSpoilersFromPlaylists = (
    passThrough: boolean,
    playlists: PlaylistItemModel[],
): PlaylistItemModel[] =>
    playlists.map((playlist) => hideSpoilersFromPlaylist(passThrough, playlist))
