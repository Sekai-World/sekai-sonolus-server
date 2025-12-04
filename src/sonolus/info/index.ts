import { config } from '../../config.js'
import { sonolus } from '../index.js'
import { sekaiText } from '../utils/sekai.js'

export const installInfo = () => {
    if (config.sonolus.bannerPath) sonolus.banner = sonolus.add(config.sonolus.bannerPath)

    sonolus.serverInfoHandler = () => ({
        title: sekaiText,
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
