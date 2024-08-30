export const hideSpoilers = <T extends { meta: { publishedAt: number } }>(
    passThrough: boolean,
    items: T[],
) => {
    if (passThrough) {
        return items
    }
    return items.filter((level) => level.meta.publishedAt <= Date.now())
}
