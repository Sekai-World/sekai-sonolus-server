import { databaseEngineItem } from '@next-sekai/sonolus-next-sekai-engine'
import { config } from '../../config.js'
import { sonolus } from '../index.js'
import { resolveEngineResource } from '../utils/engine.js'

export const installEngineItems = () => {
    sonolus.engine.items.push({
        ...databaseEngineItem,
        skin: config.sonolus.engine.skin,
        background: config.sonolus.engine.background,
        effect: config.sonolus.engine.effect,
        particle: config.sonolus.engine.particle,
        tags: [],
        thumbnail: sonolus.add(resolveEngineResource('EngineThumbnail')),
        playData: sonolus.add(resolveEngineResource('EnginePlayData')),
        watchData: sonolus.add(resolveEngineResource('EngineWatchData')),
        previewData: sonolus.add(resolveEngineResource('EnginePreviewData')),
        tutorialData: sonolus.add(resolveEngineResource('EngineTutorialData')),
        rom: sonolus.add(resolveEngineResource('EngineRom')),
        configuration: sonolus.add(resolveEngineResource('EngineConfiguration')),
    })
}
