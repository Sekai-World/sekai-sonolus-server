import {
    databaseEngineItem,
    engineConfigurationPath,
    enginePlayDataPath,
    enginePreviewDataPath,
    engineThumbnailPath,
    engineTutorialDataPath,
    engineWatchDataPath,
} from 'sonolus-pjsekai-engine'
import { config } from '../../config.js'
import { sonolus } from '../index.js'

export const installEngineItems = () => {
    sonolus.engine.items.push({
        ...databaseEngineItem,
        skin: config.sonolus.engine.skin,
        background: config.sonolus.engine.background,
        effect: config.sonolus.engine.effect,
        particle: config.sonolus.engine.particle,
        tags: [],
        thumbnail: sonolus.add(engineThumbnailPath),
        playData: sonolus.add(enginePlayDataPath),
        watchData: sonolus.add(engineWatchDataPath),
        previewData: sonolus.add(enginePreviewDataPath),
        tutorialData: sonolus.add(engineTutorialDataPath),
        configuration: sonolus.add(engineConfigurationPath),
    })
}
