import { mapValues } from '../utils/object.js'
import { RepositoryData } from './data.js'
import { match } from './utils/match.js'
import { merge } from './utils/merge.js'

export const getMusicVocalTypes = (data: RepositoryData) =>
    mapValues(
        match(
            merge(data.musicVocals, 'musicVocalType', ['caption']),
            data.musicVocalTypeCaptions,
            (musicVocal, locale, musicVocalTypeCaption) => {
                musicVocal.caption[locale] ??= musicVocalTypeCaption
            },
        ),
        (_, musicVocal) => ({
            ...musicVocal,
            title: musicVocal.caption,
        }),
    )
