import { trim } from 'es-toolkit';
import MarkdownIt from 'markdown-it';


const md = MarkdownIt({ breaks: true }).use((md) => {
    md.inline.ruler.before('emphasis', 'underline', (state, silent) => {
        const MARKUP = '__'
        const MARKER = MARKUP.charCodeAt(0)
        const ELEMENT = 'u'
        const contentStart = state.pos + 2

        if (state.src.charCodeAt(contentStart - 2) !== MARKER) return false;
        if (state.src.charCodeAt(contentStart - 1) !== MARKER) return false;

        let contentEnd = contentStart;
        while (contentEnd < state.posMax) {
            if (state.src.charCodeAt(contentEnd) === MARKER &&
                state.src.charCodeAt(contentEnd + 1) === MARKER) {
                break;
            }
            contentEnd++;
        }

        if (contentEnd >= state.posMax) return false;

        if (!silent) {
            const tokenOpen = state.push('underline_open', ELEMENT, 1);
            tokenOpen.markup = MARKUP;

            const tokenContent = state.push('text', '', 0);
            tokenContent.content = state.src.slice(contentStart, contentEnd);

            const tokenClose = state.push('underline_close', ELEMENT, -1);
            tokenClose.markup = MARKUP;
        }

        state.pos = contentEnd + 2;
        return true;
    });

    md.renderer.rules['underline_open'] = () => '<u>'
    md.renderer.rules['underline_close'] = () => '</u>'
})

export function nbsp(text?: string) {
    if (typeof text !== 'string')
        return undefined
    return text.replaceAll(' ', '&nbsp;')
}

export function markit(
    text: string,
    options?: {
        default?: string,
        unbreaks?: boolean,
        multiline?: boolean,
    }
): string;

/**
 * 类 Markdown 文本转 HTML。
 *
 * - 用 `\n` 而不是 `\n\n` 换行。
 * - 用 `__` 标记下划线 `<u></u>`，加粗 `<strong></strong>` 改用 `**` 代替。
 *
 * @param text Markdown 文本。
 * @param options 扩展选项。
 * @param options.default 入参 `text` 非 `string` 类型时的返回值。
 * @param options.multiline 多行编译。最明显的是用 `<p></p>` 包裹每行，而非用 `<br\>` 分隔。
 * @see https://markdown-it.github.io/markdown-it/#MarkdownIt.new MarkdownIt.new
 */
export function markit(
    text?: string,
    options?: {
        default?: string,
        unbreaks?: boolean,
        multiline?: boolean,
    }
) {
    if (typeof text !== 'string')
        return options?.default

    // 参数 text 预期的两端是空格“或”换行，而换行后的空格默认为正文，不会移除。
    let result = trim(trim(text), '\n').replaceAll('\\n', '\n')

    result = options?.multiline
        ? md.render(result)
        : md.renderInline(result)

    return result
}
