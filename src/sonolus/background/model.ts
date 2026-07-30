import { CharacterId } from '../../repository/character.js'

declare module '@sonolus/express' {
    interface BackgroundItemModel {
        meta?: {
            characterId: CharacterId
            rarity: string
            attribute: string
            image: 'normal' | 'trained'
            id: number
            publishedAt: number
        }
    }
}
