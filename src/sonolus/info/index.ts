import { databaseEngineItem } from 'sonolus-pjsekai-engine'
import { config } from '../../config.js'
import { sonolus } from '../index.js'

export const installInfo = () => {
    sonolus.title = databaseEngineItem.subtitle
    if (config.sonolus.bannerPath) sonolus.banner = sonolus.add(config.sonolus.bannerPath)
}
