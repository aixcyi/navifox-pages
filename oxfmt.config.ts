import { defineConfig } from 'oxfmt';

// https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html
export default defineConfig({
    tabWidth: 4,
    endOfLine: 'crlf',
    printWidth: 120,
    singleQuote: true,
    sortImports: true,
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
