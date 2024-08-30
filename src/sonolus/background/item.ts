import {
    BackgroundConfiguration,
    BackgroundData,
    compressSync,
    DatabaseTag,
    Srl,
} from '@sonolus/core'
import { BackgroundItemModel } from '@sonolus/express'
import { databaseEngineItem } from 'sonolus-pjsekai-engine'
import { getCardImagePath, getCardThumbnailPath } from '../../clients/asset/card.js'
import { config } from '../../config.js'
import { Repository } from '../../repository/index.js'
import { asset } from '../../utils/asset.js'
import { sonolus } from '../index.js'

let initialBackgrounds: BackgroundItemModel[] | undefined

let backgroundData: Srl | undefined
let backgroundConfiguration: Srl | undefined

export const updateBackgroundItems = (repository: Repository) => {
    initialBackgrounds ??= [...sonolus.background.items]

    backgroundData ??= sonolus.add(
        compressSync<BackgroundData>({
            aspectRatio: 2338 / 1440,
            fit: 'cover',
            color: '#000',
        }),
    )
    backgroundConfiguration ??= sonolus.add(
        compressSync<BackgroundConfiguration>({
            scope: 'Sekai',
            blur: 0,
            mask: '#0008',
        }),
    )

    const backgrounds: (BackgroundItemModel & { meta: object })[] = []

    for (const card of Object.values(repository.cards)) {
        const character = repository.characters[`game_character_${card.characterId}`]
        if (!character) continue

        const cardRarity = repository.cardRarities[card.cardRarityType]
        if (!cardRarity) continue

        const attribute = repository.attributes[card.attr]
        if (!attribute) continue

        const title = card.prefix
        const subtitle = character.title
        const author = databaseEngineItem.subtitle
        const tags: DatabaseTag[] = [
            { title: cardRarity.title, icon: 'star' },
            { title: attribute.title },
        ]
        const meta = {
            characterIndex: character.index,
            rarityIndex: cardRarity.index,
            attributeIndex: attribute.index,
            id: card.id,
            publishedAt: card.releaseAt,
        }

        if (cardRarity.hasTraining) {
            backgrounds.push({
                name: `${config.sonolus.prefix}-${card.id}-trained`,
                version: 2,
                title,
                subtitle,
                author,
                tags: [...tags, { title: repository.cardTexts.trained }],
                thumbnail: asset(card.server, getCardThumbnailPath(card.assetbundleName, true)),
                data: backgroundData,
                image: asset(card.server, getCardImagePath(card.assetbundleName, true)),
                configuration: backgroundConfiguration,
                meta: { ...meta, imageIndex: 1 },
            })
        }

        backgrounds.push({
            name: `${config.sonolus.prefix}-${card.id}-normal`,
            version: 2,
            title,
            subtitle,
            author,
            tags: [...tags, { title: repository.cardTexts.normal }],
            thumbnail: asset(card.server, getCardThumbnailPath(card.assetbundleName, false)),
            data: backgroundData,
            image: asset(card.server, getCardImagePath(card.assetbundleName, false)),
            configuration: backgroundConfiguration,
            meta: { ...meta, imageIndex: 0 },
        })
    }

    sonolus.background.items = [
        ...initialBackgrounds,
        ...backgrounds.sort((a, b) => b.meta.publishedAt - a.meta.publishedAt),
    ]
}
