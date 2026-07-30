import { defineConfig } from 'oxlint'

export default defineConfig({
    plugins: ['eslint', 'typescript'],
    categories: {
        correctness: 'error',
    },
    options: {
        typeAware: true,
    },
    env: {
        builtin: true,
    },
    ignorePatterns: ['**/*.*', '!src/**/*.*'],
    rules: {
        'typescript/switch-exhaustiveness-check': 'error',
        'typescript/restrict-template-expressions': 'off',
    },
})
