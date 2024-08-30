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

    const whitelist = new Map<string, boolean>()
    await Promise.all(
        [...Array(config.clients.whitelist.threadCount).keys()].map(() =>
            thread(targets, whitelist),
        ),
    )

    return {
        has: (url: string) => whitelist.get(url) ?? false,
    }
}

const thread = async (targets: Target[], whitelist: Map<string, boolean>) => {
    let target
    while ((target = targets.shift())) {
        const url = asset(target.server, target.path).url
        if (whitelist.has(url)) continue

        whitelist.set(url, false)
        if (await fetchTarget(target)) whitelist.set(url, true)
    }
}

const fetchTarget = async (target: Target) => {
    try {
        return await fetchHead(target.path, config.clients[target.server].asset)
    } catch {
        return false
    }
}
