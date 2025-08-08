import { databaseEngineItem } from 'sonolus-pjsekai-engine'
import { config } from '../../config.js'
import { sonolus } from '../index.js'

export const installInfo = () => {
    if (config.sonolus.bannerPath) sonolus.banner = sonolus.add(config.sonolus.bannerPath)

    sonolus.serverInfoHandler = () => ({
        title: databaseEngineItem.subtitle,
        buttons: [
            { type: 'post' },
            { type: 'playlist' },
            { type: 'level' },
            { type: 'skin' },
            { type: 'background' },
            { type: 'effect' },
            { type: 'particle' },
            { type: 'engine' },
            { type: 'configuration' },
        ],
        configuration: {
            options: sonolus.configuration.options,
        },
        banner: sonolus.banner,
    })
}
