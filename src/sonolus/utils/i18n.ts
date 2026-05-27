import { LocalizationText, localize } from '@sonolus/core'
import { locales } from '../../clients/i18n/locale.js'
import { config } from '../../config.js'

export const format = (template: string, values: LocalizationText[]) =>
    Object.fromEntries(
        Object.keys(locales).map((locale) => {
            let text = template
            for (const [index, value] of values.entries()) {
                text = text.replace(
                    `{${index}}`,
                    localize(value, locale, config.sonolus.fallbackLocale),
                )
            }

            return [locale, text]
        }),
    )

export const join = (separator: string, values: LocalizationText[]) =>
    Object.fromEntries(
        Object.keys(locales).map((locale) => [
            locale,
            values
                .map((value) => localize(value, locale, config.sonolus.fallbackLocale))
                .join(separator),
        ]),
    )
