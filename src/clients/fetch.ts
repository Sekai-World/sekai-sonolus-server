import { config as _config } from '../config.js'
import { ClientConfig } from './config.js'

export const fetchJson = async <T>(path: string, config: ClientConfig) => {
    const response = await _fetch('GET', path, config)
    return (await response.json()) as T
}

export const fetchText = async (path: string, config: ClientConfig) => {
    const response = await _fetch('GET', path, config)
    return await response.text()
}

export const fetchHead = async (path: string, config: ClientConfig) => {
    const response = await _fetch('HEAD', path, config)
    return response.ok
}

const _fetch = (method: string, path: string, config: ClientConfig) => {
    const url = `${config.baseUrl}${path}`

    if (_config.verbose) console.log(method, url)

    return fetch(url, {
        method,
        signal: AbortSignal.timeout(config.timeout),
    })
}
