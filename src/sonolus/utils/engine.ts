import { fileURLToPath } from 'node:url'

export const resolveEngineResource = (name: string) =>
    fileURLToPath(import.meta.resolve(`sonolus-pjsekai-engine/${name}`))
