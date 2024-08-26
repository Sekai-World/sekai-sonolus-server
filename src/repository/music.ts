import { toRomaji } from 'wanakana'
import { mapValues } from '../utils/object.js'
import { RepositoryData } from './data.js'
import { match } from './utils/match.js'
import { merge } from './utils/merge.js'

export const getMusics = (data: RepositoryData) =>
    mapValues(
        match(
            merge(data.musics, 'id', [
                'title',
                'pronunciation',
                'lyricist',
                'composer',
                'arranger',
            ]),
            data.musicTitles,
            (music, locale, musicTitle) => {
                music.title[locale] ??= musicTitle
            },
        ),
        (_, music) => {
            const pronunciations = new Set(Object.values(music.title))
            const romajis = new Set(
                [...pronunciations].map((pronunciation) => toRomaji(pronunciation)),
            )
            const cleanedRomajis = [...romajis].map((romaji) => romaji.replaceAll(/\W/g, ''))

            return {
                ...music,
                keywords: [...new Set([...pronunciations, ...romajis, ...cleanedRomajis])].join(
                    ' ',
                ),
            }
        },
    )
