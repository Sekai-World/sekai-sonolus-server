import { Text } from '@sonolus/core'
import { config } from '../../config.js'
import { sonolus } from '../index.js'
import { resolveEngineResource } from '../utils/engine.js'
import { sekaiText } from '../utils/sekai.js'

export const installPostItems = () => {
    sonolus.post.items.push({
        name: `${config.sonolus.prefix}-info`,
        version: 1,
        title: sekaiText,
        time: Date.now(),
        author: config.sonolus.post.info.author,
        tags: [{ title: { en: Text.Information } }],
        description: config.sonolus.post.info.description,
        thumbnail: sonolus.add(resolveEngineResource('EngineThumbnail')),
    })
}
