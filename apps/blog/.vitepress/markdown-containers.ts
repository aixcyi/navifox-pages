import MarkdownIt from 'markdown-it';
import type { RuleBlock } from 'markdown-it/lib/parser_block.mjs';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs';
import type StateBlock from 'markdown-it/lib/rules_block/state_block.mjs';

const MARKER = ':';
const MIN_MARKERS = 3;
const MARKER_CODE = MARKER.charCodeAt(0);

interface ContainerOptions {
    /**
     * 子容器名列表。扫描闭合行时，遇到子容器的开行会加深深度，
     * 裸 `:::` 仅当深度归零时才视为本容器的闭合行，从而支持嵌套。
     */
    childNames?: string[];
}

/** 取 `::: 容器名 附加信息` 中的容器名。 */
const nameOf = (params: string): string | undefined => /^\s*([\w-]+)/u.exec(params)?.[1];

/**
 * 生成 markdown-it 块级容器规则（仿 markdown-it-container）。
 */
function createContainerRule(name: string, options: ContainerOptions): RuleBlock {
    const childNames = options.childNames ?? [];

    return (state, startLine, endLine, silent) => {
        let pos = state.bMarks[startLine]! + state.tShift[startLine]!;
        const max = state.eMarks[startLine]!;
        if (MARKER_CODE !== state.src.charCodeAt(pos)) return false;

        let count = 0;
        while (pos + count <= max && MARKER_CODE === state.src.charCodeAt(pos + count)) count++;
        if (count < MIN_MARKERS) return false;

        const params = state.src.slice(pos + count, max);
        if (nameOf(params) !== name) return false;
        if (silent) return true;

        // 向后扫描本容器的闭合行：裸 `:::`（或更长、行尾仅空白）。
        // `columns` 内含多个 `col` 时，每个 `col` 都由各自的裸 `:::` 闭合，
        // 因此这里需要维护子容器深度，深度归零的裸 `:::` 才是本容器的闭合行。
        let foundCloser = false;
        let depth = 0;
        let nextLine = startLine;
        for (;;) {
            nextLine++;
            if (nextLine >= endLine) break; // 未闭合：随文档/父容器结束而自动闭合

            const lineStart = state.bMarks[nextLine]! + state.tShift[nextLine]!;
            const lineEnd = state.eMarks[nextLine]!;
            if (lineStart < lineEnd && state.sCount[nextLine]! < state.blkIndent) break;
            if (MARKER_CODE !== state.src.charCodeAt(lineStart)) continue;
            if (state.sCount[nextLine]! - state.blkIndent >= 4) continue;

            let p = lineStart;
            let markerCount = 0;
            while (p + markerCount <= lineEnd && MARKER_CODE === state.src.charCodeAt(p + markerCount)) {
                markerCount++;
            }
            if (markerCount < count) continue;

            const tail = state.src.slice(p + markerCount, lineEnd);
            if (childNames.some((child) => nameOf(tail) === child)) {
                depth++;
                continue;
            }
            if (tail.trim().length > 0) continue;
            if (depth > 0) {
                depth--;
                continue;
            }
            foundCloser = true;
            break;
        }

        const oldParent = state.parentType;
        const oldLineMax = state.lineMax;
        // markdown-it 运行时允许任意字符串（如 table 规则会设置 'table'），
        // 仅 @types 的 ParentType 联合类型过窄，此处需绕过类型检查。
        state.parentType = 'container' as unknown as StateBlock['parentType'];
        state.lineMax = nextLine;

        const open = state.push(`container_${name}_open`, 'div', 1);
        open.markup = MARKER.repeat(count);
        open.block = true;
        open.info = params;
        open.map = [startLine, nextLine];

        state.md.block.tokenize(state, startLine + 1, nextLine);

        const close = state.push(`container_${name}_close`, 'div', -1);
        close.markup = MARKER.repeat(count);
        close.block = true;

        state.parentType = oldParent;
        state.lineMax = oldLineMax;
        // 找到闭合行时跳过该行；自动闭合时不推进，交由外层继续处理。
        state.line = nextLine + (foundCloser ? 1 : 0);
        return true;
    };
}

/**
 * 注册一个自定义容器：开行渲染为 `<div class="vp-{name}">`（`col` 额外渲染
 * `info` 中的标题栏），闭合行渲染为 `</div>`。
 */
function registerContainer(md: MarkdownIt, name: string, options: ContainerOptions = {}): void {
    md.block.ruler.before('fence', `container_${name}`, createContainerRule(name, options), {
        alt: ['paragraph', 'reference', 'blockquote', 'list'],
    });

    const renderOpen: RenderRule = (tokens, idx, _options, env, _self) => {
        const info = tokens[idx]!.info.trim().slice(name.length).trim();
        const title = info ? `<div class="vp-${name}-title">${md.renderInline(info, env)}</div>\n` : '';
        return `<div class="vp-${name}">\n${title}`;
    };
    const renderClose: RenderRule = () => '</div>\n';
    md.renderer.rules[`container_${name}_open`] = renderOpen;
    md.renderer.rules[`container_${name}_close`] = renderClose;
}

/**
 * 自定义容器插件：`columns`（并排栅格）与 `col`（栏卡片，可带标题）。
 *
 * 用法：
 *
 * ```md
 * ::: columns
 *
 * ::: col 转置前
 * 内容……
 * :::
 *
 * ::: col 转置后
 * 内容……
 * :::
 *
 * :::
 * ```
 *
 * 说明：markdown-it-container 的默认闭合扫描无法区分内层容器的 `:::` 与本容器的
 * `:::`，这里通过维护子容器（`col`）的开合深度解决：深度归零的裸 `:::` 才闭合
 * 本容器。注意子容器内容中不要再嵌套其它 `:::` 容器，否则深度可能错乱。
 */
export function markdownContainers(md: MarkdownIt): void {
    registerContainer(md, 'columns', { childNames: ['col'] });
    registerContainer(md, 'col');
}
