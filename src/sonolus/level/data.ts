import { compress } from '@sonolus/core'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { susToUSC, uscToLevelData, version } from 'sonolus-pjsekai-engine'
import { fetchMusicChart } from '../../clients/asset/music.js'
import { MasterDifficulty } from '../../clients/master/difficulty.js'
import { Server } from '../../clients/master/server.js'
import { config } from '../../config.js'
import { sonolus } from '../index.js'

const cachePath = resolve('./cache', 'LevelData', version)

export const installLevelData = () => {
    sonolus.router.get('/sonolus/levels/:name/data', (req, res) => {
        const item = sonolus.level.items.find(({ name }) => name === req.params.name)
        if (!item) {
            res.status(404).end()
            return
        }

        const path = resolve(cachePath, item.name)
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        res.sendFile(path, async (error) => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (!error) return

            try {
                const buffer = await getLevelData(
                    item.meta.musicId,
                    item.meta.difficulty,
                    item.meta.fillerSec,
                    item.meta.server,
                )

                res.send(buffer)

                await mkdir(cachePath, { recursive: true })
                await writeFile(path, buffer)
            } catch (error) {
                console.error(error)
                res.status(500).end()
            }
        })
    })
}

export const getLevelDataUrl = (name: string) => `/sonolus/levels/${name}/data?${version}`

const getLevelData = async (
    id: number,
    difficulty: MasterDifficulty,
    fillerSec: number,
    server: Server,
) => {
    const chart = await fetchMusicChart(id, difficulty, config.clients[server].asset)
    const usc = susToUSC(chart)
    usc.offset = 0
    const levelData = uscToLevelData(usc, fillerSec)
    return compress(levelData)
}
