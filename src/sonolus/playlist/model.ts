import { CharacterId } from '../../repository/character.js'

declare module '@sonolus/express' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface PlaylistItemModel {
        meta: {
            musicVocalTypes: Set<string>
            characterIds: Set<CharacterId>
            publishedAt: number
        }
    }
}
