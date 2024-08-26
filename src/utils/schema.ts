import { TLiteral, TLiteralValue, TUnion, Type } from '@sinclair/typebox'

export const toArrayEnumSchema = <T extends readonly TLiteralValue[]>(values: T) =>
    Type.Union(values.map((value) => Type.Literal(value))) as TUnion<{
        -readonly [K in keyof T]: TLiteral<T[K]>
    }>
