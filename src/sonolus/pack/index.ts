import { packPath } from '@sonolus/free-pack'
import { config } from '../../config.js'
import { sonolus } from '../index.js'

export const installPack = () => {
    if (config.sonolus.packPath) sonolus.load(config.sonolus.packPath)

    sonolus.load(packPath)
}
