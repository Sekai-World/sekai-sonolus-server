declare module '@sonolus/express' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface BackgroundItemModel {
        meta?: {
            characterIndex: number
            rarityIndex: number
            attributeIndex: number
            imageIndex: number
            id: number
            publishedAt: number
        }
    }
}
