import { CharacterId } from '../../repository/character.js'

declare module '@sonolus/express' {
    interface PlaylistItemModel {
        meta: {
            musicVocalTypes: Set<string>
            characterIds: Set<CharacterId>
            publishedAt: number
        }
    }
}
