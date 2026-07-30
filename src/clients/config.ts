import Type from 'typebox'

export const clientConfigSchema = Type.Object({
    baseUrl: Type.String(),
    timeout: Type.Number(),
})

export type ClientConfig = Type.Static<typeof clientConfigSchema>
