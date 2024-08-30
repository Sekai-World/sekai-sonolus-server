export const hideSpoilers = <T extends { meta: { publishedAt: number } }>(
    passThrough: boolean,
    items: T[],
) => {
    if (passThrough) {
        return items
    }
    return items.filter((item) => item.meta.publishedAt <= Date.now())
}
