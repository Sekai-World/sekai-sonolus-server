import { LocalizationText, localize } from '@sonolus/core'

import { locales } from '../../clients/i18n/locale.js'
import { config } from '../../config.js'

export const toLocalized = (text: LocalizationText) => `##LOCALIZE:${JSON.stringify(text)}`

export const toLocalizationText = (text: LocalizationText | undefined, fallback: string) =>
    text ? { en: toLocalized(text) } : { en: fallback }

export const join = (separator: string, values: LocalizationText[]) =>
    Object.fromEntries(
        Object.keys(locales).map((locale) => [
            locale,
            values
                .map((value) => localize(value, locale, config.sonolus.fallbackLocale))
                .join(separator),
        ]),
    )
