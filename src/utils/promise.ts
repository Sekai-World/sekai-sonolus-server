import { entries, fromEntries } from './object.js'

export const allObject = async <T extends Record<string, Promise<unknown>>>(object: T) =>
    fromEntries(
        await Promise.all(entries(object).map(async ([k, v]) => [k, await v] as const)),
    ) as {
        [K in keyof T]: Awaited<T[K]>
    }
