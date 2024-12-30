import { LocalizationText } from '@sonolus/core'

export const toOptionValues = (
    objects: Record<
        PropertyKey,
        {
            index: number
            title: LocalizationText
        }
    >,
) =>
    Object.fromEntries(
        Object.values(objects).map((object) => [
            object.index,
            {
                title: object.title,
                def: true,
            },
        ]),
    )
