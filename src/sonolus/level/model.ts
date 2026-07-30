import { MasterDifficulty } from '../../clients/master/difficulty.js'
import { Server } from '../../clients/master/server.js'
import { CharacterId } from '../../repository/character.js'

declare module '@sonolus/express' {
    interface LevelItemModel {
        meta: {
            musicId: number
            musicVocalId: number
            musicVocalType: string
            publishedAt: number
            characterIds: CharacterId[]
            characters: string
            difficulty: MasterDifficulty
            fillerSec: number
            server: Server
        }
    }
}
