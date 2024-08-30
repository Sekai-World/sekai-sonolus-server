import { ServerOptionsModel } from '@sonolus/express'

export const serverOptions = {
    spoilers: {
        type: 'toggle',
        name: {
            en: 'Spoilers',
        },
        def: false,
        description: {
            en: 'Whether to show unreleased items.',
        },
        required: false,
    },
} as const satisfies ServerOptionsModel
