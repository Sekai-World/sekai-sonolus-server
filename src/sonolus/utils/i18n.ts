import { localize } from '@sonolus/core'

import { locales } from '../../clients/i18n/locale.js'
import { config } from '../../config.js'

export const toLocalized = (text: Record<string, string>) => `##LOCALIZE:${JSON.stringify(text)}`

export const toLocalizedWithFallback = (
    text: Record<string, string> | undefined,
    fallback: string,
) => (text ? toLocalized(text) : fallback)

export const join = (separator: string, values: Record<string, string>[]) =>
    Object.fromEntries(
        Object.keys(locales).map((locale) => [
            locale,
            values
                .map((value) => localize(value, locale, config.sonolus.fallbackLocale))
                .join(separator),
        ]),
    )
