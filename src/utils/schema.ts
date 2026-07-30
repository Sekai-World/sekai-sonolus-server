import Type from 'typebox'

export const toArrayEnumSchema = <T extends readonly Type.TLiteralValue[]>(values: T) =>
    Type.Union(values.map((value) => Type.Literal(value))) as Type.TUnion<{
        -readonly [K in keyof T]: Type.TLiteral<T[K]>
    }>
