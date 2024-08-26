import { Static, Type } from '@sinclair/typebox'

export const clientConfigSchema = Type.Object({
    baseUrl: Type.String(),
    timeout: Type.Number(),
})

export type ClientConfig = Static<typeof clientConfigSchema>
