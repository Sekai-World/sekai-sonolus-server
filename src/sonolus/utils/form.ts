import { mapValues } from '../../utils/object.js'
import { toLocalized } from './i18n.js'

export const toMultiValues = (object: Record<PropertyKey, { title: string }>) =>
    mapValues(object, (_, { title }) => ({
        title,
        def: true,
    }))

export const toLocalizedMultiValues = (
    object: Record<PropertyKey, { title: Record<string, string> }>,
) =>
    mapValues(object, (_, { title }) => ({
        title: toLocalized(title),
        def: true,
    }))
