import { SonolusRedirectShare, SonolusSpaShare } from '@sonolus/express'
import express from 'express'
import { config } from './config.js'
import { fetchRepository } from './repository/index.js'
import { sonolus, updateSonolus } from './sonolus/index.js'

updateSonolus(await fetchRepository())

const app = express()
app.disable('x-powered-by')

app.use(config.sonolus.basePath, sonolus.router)
if (config.sonolusShare.mode === 'spa') {
    app.use(config.sonolus.basePath, new SonolusSpaShare(config.sonolusShare.publicPath).router)
} else {
    app.use(config.sonolus.basePath, new SonolusRedirectShare(config.sonolusShare.root).router)
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.listen(config.port, async () => {
    console.log('Server listening at port', config.port)

    while (true) {
        await new Promise((resolve) => setTimeout(resolve, config.updateInterval))

        try {
            updateSonolus(await fetchRepository())
        } catch (error) {
            console.error(error)
        }
    }
})
