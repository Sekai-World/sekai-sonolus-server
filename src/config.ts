import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import { readFileSync } from 'node:fs'
import { clientConfigSchema } from './clients/config.js'
import { serverSchema } from './clients/master/server.js'

const localizationTextSchema = Type.Record(Type.String(), Type.String())

const configSchema = Type.Object({
    port: Type.Number(),
    verbose: Type.Boolean(),
    updateInterval: Type.Number(),
    sonolus: Type.Object({
        prefix: Type.String(),
        basePath: Type.String(),
        address: Type.String(),
        fallbackLocale: Type.String(),
        bannerPath: Type.String(),
        packPath: Type.String(),
        post: Type.Object({
            info: Type.Object({
                author: localizationTextSchema,
                description: localizationTextSchema,
            }),
        }),
        engine: Type.Object({
            skin: Type.String(),
            background: Type.String(),
            effect: Type.String(),
            particle: Type.String(),
        }),
    }),
    sonolusShare: Type.Union([
        Type.Object({
            mode: Type.Literal('spa'),
            publicPath: Type.String(),
        }),
        Type.Object({
            mode: Type.Literal('redirect'),
            root: Type.String(),
        }),
    ]),
    clients: Type.Intersect([
        Type.Record(
            serverSchema,
            Type.Object({
                master: clientConfigSchema,
                asset: clientConfigSchema,
            }),
        ),
        Type.Object({
            i18n: clientConfigSchema,
            whitelist: Type.Object({
                enabled: Type.Boolean(),
                threadCount: Type.Number(),
            }),
        }),
    ]),
})

const rawConfig: unknown = JSON.parse(readFileSync('./config.json', 'utf8'))
Value.Assert(configSchema, rawConfig)

export const config = rawConfig
