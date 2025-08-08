import { Text } from '@sonolus/core'
import { filterPlaylists, paginateItems } from '@sonolus/express'
import { databaseEngineItem } from 'sonolus-pjsekai-engine'
import { config } from '../../config.js'
import { sonolus } from '../index.js'
import { randomizeItems } from '../utils/list.js'
import { playlists } from './item.js'
import { playlistSearches } from './search.js'

export const installPlaylistList = () => {
    sonolus.playlist.listHandler = ({ search: { type, options }, page, options: { spoilers } }) => {
        if (type === 'quick')
            return {
                ...paginateItems(
                    filterPlaylists(playlists[spoilers.music ? 1 : 0], options.keywords),
                    page,
                ),
                searches: playlistSearches,
            }

        if (type === 'random')
            return {
                pageCount: 1,
                items: [
                    {
                        name: `${config.sonolus.prefix}-random-${options.minRating}-${options.maxRating}`,
                        version: 1,
                        title: { en: `${options.minRating} - ${options.maxRating}` },
                        subtitle: {},
                        author: databaseEngineItem.subtitle,
                        tags: [{ title: { en: Text.Random } }],
                        levels: [],
                        meta: {
                            musicVocalTypes: new Set(),
                            characterIds: new Set(),
                            publishedAt: Date.now(),
                        },
                    },
                ],
                searches: playlistSearches,
            }

        const items = filterPlaylists(
            playlists[spoilers.music ? 1 : 0].filter(
                ({ meta }) =>
                    (!meta.characterIds.size ||
                        [...meta.characterIds].some(
                            (characterId) => options.artists[characterId],
                        )) &&
                    (!meta.musicVocalTypes.size ||
                        [...meta.musicVocalTypes].some(
                            (musicVocalType) => options.categories[musicVocalType],
                        )),
            ),
            options.keywords,
        )
        return {
            ...(options.random ? randomizeItems(items) : paginateItems(items, page)),
            searches: playlistSearches,
        }
    }
}
