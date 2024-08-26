import { RepositoryData } from './data.js'
import { match } from './utils/match.js'
import { merge } from './utils/merge.js'

export const getCards = (data: RepositoryData) =>
    match(merge(data.cards, 'id', ['prefix']), data.cardPrefixes, (card, locale, cardPrefix) => {
        card.prefix[locale] ??= cardPrefix
    })
