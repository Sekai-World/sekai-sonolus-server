import { Text } from '@sonolus/core'
import { databaseEngineItem, engineThumbnailPath } from 'sonolus-pjsekai-engine'
import { config } from '../../config.js'
import { sonolus } from '../index.js'

export const installPostItems = () => {
    sonolus.post.items.push({
        name: `${config.sonolus.prefix}-info`,
        version: 1,
        title: databaseEngineItem.subtitle,
        time: Date.now(),
        author: config.sonolus.post.info.author,
        tags: [{ title: { en: Text.Information } }],
        description: config.sonolus.post.info.description,
        thumbnail: sonolus.add(engineThumbnailPath),
    })
}
