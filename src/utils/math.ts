export const randomize = <T>(items: T[], count: number) => {
    const pool = [...items]
    const result: T[] = []

    while (pool.length && result.length < count) {
        const index = Math.floor(Math.random() * pool.length)
        result.push(...pool.splice(index, 1))
    }

    return result
}
