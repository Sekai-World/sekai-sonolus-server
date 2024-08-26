import { config } from '../../config.js'
import { entries, fromEntries } from '../../utils/object.js'
import { ClientConfig } from '../config.js'
import { fetchJson } from '../fetch.js'
import { locales } from './locale.js'

export const fetchI18n =
    <T>(path: string) =>
    (language: string, config: ClientConfig) =>
        fetchJson<T>(`/${language}${path}`, config)

export const fetchI18ns = async <T>(
    fetch: (language: string, config: ClientConfig) => Promise<T>,
) =>
    fromEntries(
        await Promise.all(
            entries(locales).map(
                async ([locale, language]) =>
                    [locale, await fetch(language, config.clients.i18n)] as const,
            ),
        ),
    )
