import { entries } from '../../utils/object.js'

export const match = <K extends PropertyKey, T, U>(
    objects: Record<K, T>,
    i18ns: Record<string, Record<K, U>>,
    onMatch: (object: T, locale: string, i18n: U) => void,
) => {
    for (const [locale, values] of entries(i18ns)) {
        for (const [id, i18n] of entries(values)) {
            const object = objects[id]
            if (!object) continue

            onMatch(object, locale, i18n)
        }
    }

    return objects
}
