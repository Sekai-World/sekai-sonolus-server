export const entries = Object.entries as <T extends object>(object: T) => [keyof T, T[keyof T]][]

export const fromEntries = Object.fromEntries as <K extends PropertyKey, V>(
    entries: Iterable<readonly [K, V]>,
) => Record<K, V>

export const mapValues = <T extends object, V>(
    object: T,
    callback: (key: keyof T, value: T[keyof T], index: number) => V,
) => fromEntries(entries(object).map(([k, v], i) => [k, callback(k, v, i)]))

export const notUndefined = <T>(obj: T | undefined): obj is T => obj !== undefined
