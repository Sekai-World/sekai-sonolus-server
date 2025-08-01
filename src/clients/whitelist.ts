import { config } from '../config.js'
import { asset } from '../utils/asset.js'
import { fetchHead } from './fetch.js'
import { Server } from './master/server.js'

type Target = {
    server: Server
    path: string
}

export const fetchWhitelist = async (targets: Target[]) => {
    if (!config.clients.whitelist.enabled)
        return {
            has: () => true,
        }

    const abortController = new AbortController()

    try {
        const whitelist = new Map<string, boolean>()
        await Promise.all(
            [...Array(config.clients.whitelist.threadCount).keys()].map(() =>
                thread(targets, whitelist, abortController.signal),
            ),
        )

        return {
            has: (url: string) => whitelist.get(url) ?? false,
        }
    } catch (error) {
        abortController.abort()
        throw error
    }
}

const thread = async (targets: Target[], whitelist: Map<string, boolean>, signal: AbortSignal) => {
    let target
    while ((target = targets.shift())) {
        const url = asset(target.server, target.path).url
        if (whitelist.has(url)) continue

        whitelist.set(url, false)
        if (await fetchTarget(target, signal)) whitelist.set(url, true)
    }
}

const fetchTarget = async (target: Target, signal: AbortSignal) => {
    try {
        return await fetchHead(target.path, config.clients[target.server].asset, signal)
    } catch {
        return false
    }
}
