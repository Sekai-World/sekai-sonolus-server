import { Server } from '../../clients/master/server.js'
import { entries, fromEntries } from '../../utils/object.js'

export const merge = <T extends object, PK extends keyof T, K extends keyof T>(
    data: Record<Server, T[]>,
    primaryKey: PK,
    keys: K[],
) => {
    const result: Record<
        T[PK] & PropertyKey,
        Omit<T, K> & {
            [P in K]-?: Record<string, T[P]>
        } & {
            server: Server
        }
    > = {} as never

    for (const [server, items] of entries(data)) {
        for (const item of items) {
            const id = item[primaryKey] as T[PK] & PropertyKey

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            result[id] ??= {
                ...item,
                ...fromEntries(keys.map((key) => [key, {}])),
                server,
            } as never

            for (const key of keys) {
                result[id][key][server] = item[key]
            }
        }
    }

    return result
}
