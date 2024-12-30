import { MasterDifficulty } from '../../clients/master/difficulty.js'
import { Server } from '../../clients/master/server.js'
import { CharacterId } from '../../repository/character.js'

declare module '@sonolus/express' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface LevelItemModel {
        meta: {
            musicId: number
            musicVocalId: number
            musicVocalType: string
            publishedAt: number
            characterIds: CharacterId[]
            difficulty: MasterDifficulty
            fillerSec: number
            server: Server
        }
    }
}
