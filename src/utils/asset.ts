import { Server } from '../clients/master/server.js'
import { config } from '../config.js'

export const asset = (server: Server, path: string) => ({
    url: `${config.clients[server].asset.baseUrl}${path}`,
})
