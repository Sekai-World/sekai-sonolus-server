// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const capitalize = (str: string) => str && str[0]!.toLocaleUpperCase() + str.substring(1)
