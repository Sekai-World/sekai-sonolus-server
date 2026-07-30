import { defineConfig } from 'oxfmt'

export default defineConfig({
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    sortImports: {},
    ignorePatterns: [
        '**/*.*',

        '!config.example.json',
        '!oxfmt.config.ts',
        '!oxlint.config.ts',
        '!README.md',

        '!src/**/*.*',
    ],
})
