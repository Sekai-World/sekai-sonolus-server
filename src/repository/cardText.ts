import { mapValues } from '../utils/object.js'
import { RepositoryData } from './data.js'

export const getCardTexts = (data: RepositoryData) =>
    mapValues(
        {
            normal: 'title[0]',
            trained: 'title[2]',
        } as const,
        (_, key) => mapValues(data.cardTexts, (_, i18n) => i18n.tab[key]),
    )
