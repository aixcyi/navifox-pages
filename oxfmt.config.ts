import { defineConfig } from 'oxfmt';

export default defineConfig({
    tabWidth: 4,
    endOfLine: 'crlf',
    printWidth: 120,
    singleQuote: true,
    sortTailwindcss: true,
    sortPackageJson: {
        sortScripts: true,
    },
    ignorePatterns: [
        '**/node_modules/*',
        '**/dist/*',
        '**/*.md',
        '**/*.svg',
        '.vscode/*',
        '.idea/*',
        '.agents/*',
        '*.code-workspace',
    ],
});
