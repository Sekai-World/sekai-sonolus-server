import { LocalizationText } from '@sonolus/core'
import { MasterDifficulty } from '../../clients/master/difficulty.js'
import { Server } from '../../clients/master/server.js'

declare module '@sonolus/express' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface LevelItemModel {
        meta: {
            musicId: number
            musicVocalId: number
            publishedAt: number
            difficultyIndex: number
            musicVocalTypeIndex: number
            musicVocalTypeTitle: LocalizationText
            characterIndexes: number[]
            difficulty: MasterDifficulty
            fillerSec: number
            server: Server
        }
    }
}
