import { fromEntries } from '../utils/object.js'
import { capitalize } from '../utils/string.js'
import { RepositoryData } from './data.js'

export const getAttributes = (data: RepositoryData) =>
    fromEntries(
        [
            ...new Set(
                Object.values(data.cards)
                    .flat()
                    .map((card) => card.attr),
            ),
        ]
            .sort((a, b) => a.localeCompare(b))
            .map((attr) => [
                attr,
                {
                    title: { en: capitalize(attr) },
                },
            ]),
    )
