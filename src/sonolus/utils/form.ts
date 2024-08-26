import { LocalizationText } from '@sonolus/core'

export const toOptionValues = (objects: Record<PropertyKey, { title: LocalizationText }>) =>
    Object.values(objects).map((object) => ({
        title: object.title,
        def: true,
    }))
