import { LocalizationText, localize } from '@sonolus/core'
import { config } from '../../config.js'
import { mapValues } from '../../utils/object.js'
import { format as _format } from '../../utils/string.js'

export const format = (template: LocalizationText, values: LocalizationText[]) =>
    mapValues(template, (locale, template) =>
        _format(
            template,
            values.map((value) => localize(value, locale, config.sonolus.fallbackLocale)),
        ),
    )

export const join = (separator: LocalizationText, values: LocalizationText[]) =>
    mapValues(separator, (locale, separator) =>
        values
            .map((value) => localize(value, locale, config.sonolus.fallbackLocale))
            .join(separator),
    )
