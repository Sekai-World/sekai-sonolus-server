import { PlaylistItemModel } from '@sonolus/express'
import { sonolus } from '../index.js'

export const hideSpoilers = <T extends { meta: { publishedAt: number } }>(
    passThrough: boolean | undefined,
    items: T[],
) => {
    if (passThrough) return items

    return items.filter((item) => item.meta.publishedAt <= Date.now())
}

export const hideSpoilersFromPlaylist = (
    passThrough: boolean | undefined,
    playlist: PlaylistItemModel,
) => {
    if (passThrough) return playlist

    return {
        ...playlist,
        levels: hideSpoilers(
            false,
            playlist.levels.map((levelNameOrItem) => {
                if (typeof levelNameOrItem === 'object') return levelNameOrItem

                const level = sonolus.level.items.find((level) => level.name === levelNameOrItem)
                if (!level) throw new Error(`Level not found: ${levelNameOrItem}`)

                return level
            }),
        ),
    }
}

export const hideSpoilersFromPlaylists = (
    passThrough: boolean | undefined,
    playlists: PlaylistItemModel[],
) => {
    if (passThrough) return playlists

    return playlists.map((playlist) => hideSpoilersFromPlaylist(false, playlist))
}
