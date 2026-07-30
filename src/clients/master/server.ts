import Type from 'typebox'

import { toArrayEnumSchema } from '../../utils/schema.js'

export const servers = ['ja', 'en', 'ko', 'zht'] as const

export const serverSchema = toArrayEnumSchema(servers)

export type Server = Type.Static<typeof serverSchema>
