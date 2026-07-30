import { LocalizationText } from '@sonolus/core'

import { mapValues } from '../../utils/object.js'
import { toLocalized } from './i18n.js'

export const toMultiValues = <T extends Record<PropertyKey, { title: LocalizationText }>>(
    object: T,
) =>
    mapValues(object, (_, { title }) => ({
        title: { en: toLocalized(title) },
        def: true,
    }))
