declare module '@sonolus/express' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface PlaylistItemModel {
        meta: {
            musicVocalTypeIndexes: Set<number>
            characterIndexes: Set<number>
            publishedAt: number
        }
    }
}
