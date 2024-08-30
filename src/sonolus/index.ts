import { Sonolus } from '@sonolus/express'
import { config } from '../config.js'
import { Repository } from '../repository/index.js'
import { installBackground, updateBackground } from './background/index.js'
import { backgroundSearches } from './background/search.js'
import { updateConfiguration } from './configuration/index.js'
import { configurationOptions } from './configuration/option.js'
import { installEngine } from './engine/index.js'
import { installInfo } from './info/index.js'
import { installLevel, updateLevel } from './level/index.js'
import { levelSearches } from './level/search.js'
import { installPack } from './pack/index.js'
import { installPlaylist, updatePlaylist } from './playlist/index.js'
import { playlistSearches } from './playlist/search.js'
import { installPost } from './post/index.js'

export const sonolus = new Sonolus({
    address: config.sonolus.address,
    fallbackLocale: config.sonolus.fallbackLocale,

    playlist: {
        searches: playlistSearches,
    },
    level: {
        searches: levelSearches,
    },
    background: {
        searches: backgroundSearches,
    },
    configuration: {
        options: configurationOptions,
    },
})

installPack()
installInfo()
installPost()
installPlaylist()
installLevel()
installBackground()
installEngine()

export const updateSonolus = (repository: Repository) => {
    updateConfiguration(repository)
    updateLevel(repository)
    updatePlaylist(repository)
    updateBackground(repository)
}
