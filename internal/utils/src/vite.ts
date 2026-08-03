import type { Plugin } from 'vite';

/**
 * 为构建时生成的静态 HTML 注入 Open Graph 元数据。
 *
 * 解决纯 SPA 的 OG 检测问题：社交媒体爬虫（微信 / Discord / Slack 等）
 * 不执行 JavaScript，只解析服务器返回的静态 HTML。
 * 此插件在 Vite 构建时把 OG 标签写入 `index.html`，
 * 运行时仍由 `useHead` 接管（会覆盖/合并同名标签）。
 */
export function ogPlugin(config: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    image?: string;
}): Plugin {
    const tags = [
        `<meta name="description" content="${esc(config.description)}">`,
        `<meta property="og:type" content="website">`,
        `<meta property="og:title" content="${esc(config.title)}">`,
        `<meta property="og:description" content="${esc(config.description)}">`,
        `<meta property="og:url" content="${esc(config.url)}">`,
        `<meta property="og:site_name" content="${esc(config.siteName)}">`,
    ];
    if (config.image) {
        tags.push(`<meta property="og:image" content="${esc(config.image)}">`);
    }

    return {
        name: 'navifox:inject-og',
        transformIndexHtml: {
            order: 'pre',
            handler(html) {
                return html.replace(
                    '<title></title>',
                    `<title>${esc(config.title)}</title>\n        ${tags.join('\n        ')}`,
                );
            },
        },
    };
}

function esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
