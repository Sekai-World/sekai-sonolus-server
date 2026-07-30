import { LevelItemModel } from '@sonolus/express'

import {
    getMusicBgmPath,
    getMusicChartPath,
    getMusicCoverPath,
    getMusicPreviewPath,
} from '../../clients/asset/music.js'
import { difficulties } from '../../clients/master/difficulty.js'
import { config } from '../../config.js'
import { Repository } from '../../repository/index.js'
import { asset } from '../../utils/asset.js'
import { notUndefined } from '../../utils/object.js'
import { Group } from '../utils/group.js'
import { format, join } from '../utils/i18n.js'
import { sekaiText } from '../utils/sekai.js'
import { getLevelDataUrl } from './data.js'

export const levels: Group<LevelItemModel[]> = [[], []]
export const levelsMap = new Map<string, LevelItemModel>()

export const updateLevelItems = (repository: Repository) => {
    levels[1].length = 0

    for (const musicDifficulty of Object.values(repository.musicDifficulties)) {
        const music = repository.musics[musicDifficulty.musicId]
        if (!music) continue

        const chart = asset(
            musicDifficulty.server,
            getMusicChartPath(music.id, musicDifficulty.musicDifficulty),
        )
        if (!repository.whitelist.has(chart.url)) continue

        const musicVocals = Object.values(repository.musicVocals).filter(
            ({ musicId }) => musicId === music.id,
        )

        const description = format(
            [
                '#LYRICIST:#SEPARATOR_COLON:{0}',
                '#COMPOSER:#SEPARATOR_COLON:{1}',
                '#ARRANGER:#SEPARATOR_COLON:{2}',
                '',
                `##:${music.keywords}`,
            ].join('\n'),
            [music.lyricist, music.composer, music.arranger],
        )

        const cover = asset(music.server, getMusicCoverPath(music.assetbundleName))

        for (const musicVocal of musicVocals) {
            const musicVocalTypeTitle = repository.musicVocalTypes[musicVocal.musicVocalType]
                ?.title ?? { en: musicVocal.musicVocalType }

            const bgm = asset(musicVocal.server, getMusicBgmPath(musicVocal.assetbundleName))
            if (!repository.whitelist.has(bgm.url)) continue

            const name = `${config.sonolus.prefix}-${music.id}-${musicVocal.id}-${musicDifficulty.musicDifficulty}`

            const preview = asset(
                musicVocal.server,
                getMusicPreviewPath(musicVocal.assetbundleName),
            )

            const characterIds = musicVocal.characters.map(
                (character) => `${character.characterType}_${character.characterId}` as const,
            )
            const characters = characterIds
                .map((characterId) => repository.characters[characterId])
                .filter(notUndefined)

            levels[1].push({
                name,
                version: 1,
                rating: musicDifficulty.playLevel,
                title: music.title,
                artists: characters.length
                    ? join(
                          ' & ',
                          characters.map((character) => character.title),
                      )
                    : musicVocalTypeTitle,
                author: sekaiText,
                tags: [
                    { title: difficulties[musicDifficulty.musicDifficulty].title },
                    { title: musicVocalTypeTitle },
                ],
                description,
                engine: 'next-sekai',
                useSkin: { useDefault: true },
                useBackground: { useDefault: true },
                useEffect: { useDefault: true },
                useParticle: { useDefault: true },
                cover,
                bgm,
                preview,
                data: { url: getLevelDataUrl(name) },
                meta: {
                    musicId: music.id,
                    musicVocalId: musicVocal.id,
                    musicVocalType: musicVocal.musicVocalType,
                    publishedAt: music.publishedAt,
                    characterIds,
                    characters: characterIds.sort().join(),
                    difficulty: musicDifficulty.musicDifficulty,
                    fillerSec: music.fillerSec,
                    server: musicDifficulty.server,
                },
            })
        }
    }

    levels[1].sort(
        (a, b) =>
            b.meta.publishedAt - a.meta.publishedAt ||
            b.meta.musicId - a.meta.musicId ||
            difficulties[a.meta.difficulty].index - difficulties[b.meta.difficulty].index,
    )
    levels[0] = levels[1].filter((item) => item.meta.publishedAt <= Date.now())

    levelsMap.clear()
    for (const level of levels[1]) {
        levelsMap.set(level.name, level)
    }
}
