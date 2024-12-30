export type HasMeta<T extends { meta?: object }> = T & { meta: object }

export type NoMeta<T extends { meta?: object }> = T & { meta: undefined }

export const hasMeta = <T extends { meta?: object }>(item: T): item is HasMeta<T> => !!item.meta

export const noMeta = <T extends { meta?: object }>(item: T): item is NoMeta<T> => !item.meta
