declare module '@sonolus/express' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface BackgroundItemModel {
        meta?: {
            characterIndex: number
            rarityIndex: number
            attributeIndex: number
            imageType: 'normal' | 'trained'
            id: number
            publishedAt: number
        }
    }
}
