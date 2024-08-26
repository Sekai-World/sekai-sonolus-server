import { randomize } from '../../utils/math.js'

export const toIndexes = (values: boolean[]) =>
    values
        .map((value, index) => ({ value, index }))
        .filter(({ value }) => value)
        .map(({ index }) => index)

export const randomizeItems = <T>(items: T[]) => {
    if (!items.length)
        return {
            pageCount: 0,
            items: [],
        }

    return {
        pageCount: 1,
        items: randomize(items, 20),
    }
}
