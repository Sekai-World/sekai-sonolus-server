import { fileURLToPath } from 'node:url'

export const resolveEngineResource = (name: string) =>
    fileURLToPath(import.meta.resolve(`@next-sekai/sonolus-next-sekai-engine/${name}`))
