import { config } from '../../config.js'
import { fromEntries } from '../../utils/object.js'
import { ClientConfig } from '../config.js'
import { fetchJson } from '../fetch.js'
import { servers } from './server.js'

export const fetchMaster =
    <T>(path: string) =>
    (config: ClientConfig) =>
        fetchJson<T>(path, config)

export const fetchMasters = async <T>(fetch: (config: ClientConfig) => Promise<T>) =>
    fromEntries(
        await Promise.all(
            servers.map(
                async (server) => [server, await fetch(config.clients[server].master)] as const,
            ),
        ),
    )
