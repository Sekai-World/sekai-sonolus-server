export type Group<T> = [T, T]

export const mapGroup = <T, U>(group: Group<T>, fn: (item: T) => U): Group<U> => [
    fn(group[0]),
    fn(group[1]),
]
