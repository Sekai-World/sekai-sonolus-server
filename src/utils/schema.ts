import { TLiteral, TLiteralValue, TUnion, Type } from '@sinclair/typebox'

export const toArrayEnumSchema = <T extends readonly TLiteralValue[]>(values: T) =>
    Type.Union(values.map((value) => Type.Literal(value))) as TUnion<{
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
        -readonly [K in keyof T]: TLiteral<T[K]>
    }>
