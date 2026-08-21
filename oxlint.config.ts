import { defineConfig } from 'oxlint';

// https://oxc.rs/docs/guide/usage/linter/config-file-reference.html
export default defineConfig({
    plugins: ['typescript', 'unicorn', 'oxc'],
    categories: {
        correctness: 'error',
    },
    rules: {},
    env: {
        builtin: true,
    },
    ignorePatterns: [
        '**/node_modules/*',
        '**/dist/*',
        '**/*.md',
        '.vscode/*',
        '.idea/*',
        '.agents/*',
        '*.code-workspace',
    ],
});
