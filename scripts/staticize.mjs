#!/usr/bin/env node
// 生成 refs 的 Iconify 离线图标注册表 apps/refs/src/iconify.ts。
//
// 背景：@iconify/vue 以字符串（如 icon="logos:python"）引用图标时，默认在运行时向
// Iconify 公共 CDN（api.iconify.design）发起网络请求，国内访问慢且不稳定。本脚本将
// refs 实际用到的图标 SVG 数据在开发期一次性拉取并生成离线注册表，运行时零网络请求。
//
// 用法（在仓库根目录运行）：
//   node scripts/staticize.mjs           # 扫描、拉取并生成 apps/refs/src/iconify.ts
//   node scripts/staticize.mjs --dry-run # 只列出扫描到的图标，不拉取不写文件
//   node scripts/staticize.mjs --allow-missing # 存在缺失图标时仍生成（仅警告）
//
// 维护约定：
//   1. 新增/修改图标引用（favorites.ts 的 logo、组件里的 icon 等）后重新运行本脚本。
//   2. 脚本自动扫描 apps/refs/src，以及 refs 渲染时会用到的共享数据与组件
//      （internal/constants 的 favorites.ts / website.ts、internal/ui 的
//      AiFooter.vue / AiButton.vue），引用不存在于 Iconify 的图标名会报错
//      （除非 --allow-missing）。
//   3. 生成的 apps/refs/src/iconify.ts 提交入库，构建与运行均不依赖网络。
//   4. iconify.ts 自身不参与扫描；重新生成时会移除已无任何引用的旧图标。
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url)); // scripts/
const REPO_DIR = resolve(HERE, '..');
const REFS_DIR = join(REPO_DIR, 'apps/refs');
const SRC_DIR = join(REFS_DIR, 'src');
const OUT_FILE = join(SRC_DIR, 'iconify.ts');
const API_BASE = 'https://api.iconify.design';
// refs 页面渲染的图标可能来自共享常量与共享组件（AiFooter/AiButton 等），一并纳入扫描。
const EXTRA_SCAN_FILES = [
    join(REPO_DIR, 'internal/constants/src/favorites.ts'),
    join(REPO_DIR, 'internal/constants/src/website.ts'),
    join(REPO_DIR, 'internal/ui/src/ui/AiFooter.vue'),
    join(REPO_DIR, 'internal/ui/src/ui/AiButton.vue'),
];

const ICON_NAME_RE = /^[a-z0-9-]+:[a-z0-9-]+$/;
// Tailwind 变体前缀（sm:、hover:、dark: 等）会与图标名同形，脚本块中的类名数组也会误报，扫描时排除。
const TAILWIND_VARIANT_RE =
    /^(?:sm|md|lg|xl|2xl|3xl|max-sm|max-md|max-lg|max-xl|min-sm|min-md|min-lg|min-xl|hover|focus|focus-within|focus-visible|active|visited|target|first|last|only|odd|even|first-of-type|last-of-type|only-of-type|empty|checked|disabled|enabled|required|valid|invalid|in-range|out-of-range|read-only|indeterminate|default|optional|placeholder-shown|autofill|open|dark|light|group|group-hover|group-focus|group-active|group-visited|group-odd|group-even|group-checked|peer|peer-hover|peer-focus|peer-checked|motion-safe|motion-reduce|contrast-more|contrast-less|print|portrait|landscape|selection|marker|before|after|placeholder|file|backdrop|rtl|ltr|supports-|has-|not-|aria-|data-|min-|max-)$/;
const QUOTED_RE = /(["'])([^"'\n]+)\1/g;
const HTML_COMMENT_RE = /<!--[\s\S]*?-->/g;
// 剔除 // 行注释与 /* */ 块注释；先匹配引号字符串（含 // 的 URL 等不受影响），再匹配注释。
const TS_COMMENT_RE = /(["'`])(?:\\.|(?!\1)[^\\\n])*\1|\/\/[^\n]*|\/\*[\s\S]*?\*\//g;

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const allowMissing = args.has('--allow-missing');

/** 递归收集目录下所有 .vue / .ts 文件。 */
function walk(dir, out = []) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.name.startsWith('.')) continue;
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(full, out);
        } else if (/\.(vue|ts)$/.test(entry.name)) {
            out.push(full);
        }
    }
    return out;
}

/** 从源码文本中提取所有「prefix:name」形式的图标名。 */
function extractIconNames(text) {
    const names = new Set();
    for (const match of text.matchAll(QUOTED_RE)) {
        const candidate = match[2];
        if (!ICON_NAME_RE.test(candidate)) continue;
        if (TAILWIND_VARIANT_RE.test(candidate.split(':')[0])) continue;
        names.add(candidate);
    }
    return names;
}

// 1. 扫描源码，收集图标名（图标名 -> 引用文件列表）。
// 输出文件 iconify.ts 不参与扫描：若把旧注册表自身当作引用来源，
// 已无代码引用的图标会被重复收集而永远保留，重新生成无法清理。
const scanFiles = [...walk(SRC_DIR), ...EXTRA_SCAN_FILES].filter((file) => file !== OUT_FILE);
const found = new Map(); // icon name -> files
for (const file of scanFiles) {
    let text = readFileSync(file, 'utf8');
    if (file.endsWith('.vue')) {
        text = text.replace(HTML_COMMENT_RE, '');
        // Tailwind 类名（如 md:mt-14）与图标名同形，先剔除 class / :class 属性值。
        text = text.replace(/(?:\s|^)(?::?class)="[^"]*"/g, ' ');
        text = text.replace(/(?:\s|^)(?::?class)='[^']*'/g, ' ');
    } else {
        text = text.replace(TS_COMMENT_RE, (match, quote) => (quote ? match : ''));
    }
    for (const name of extractIconNames(text)) {
        if (!found.has(name)) found.set(name, []);
        found.get(name).push(file);
    }
}

// 2. 按集合前缀分组并排序。
const names = [...found.keys()].sort();
const byPrefix = new Map(); // prefix -> icon names
for (const name of names) {
    const prefix = name.split(':')[0];
    if (!byPrefix.has(prefix)) byPrefix.set(prefix, []);
    byPrefix.get(prefix).push(name);
}

console.log(`扫描文件：${scanFiles.length} 个（refs/src 及共享数据/组件）`);
console.log(`发现图标：${names.length} 个，来自 ${byPrefix.size} 个集合：`);
for (const [prefix, icons] of [...byPrefix.entries()].sort()) {
    console.log(`  ${prefix.padEnd(18)} ${icons.length} 个：${icons.join(', ')}`);
}

if (dryRun) {
    console.log('\n[dry-run] 未拉取数据、未写文件。');
    process.exit(0);
}

// 3. 逐集合从 Iconify API 拉取图标 SVG 数据。
const missing = [];
const entries = [];
for (const [prefix, iconNames] of [...byPrefix.entries()].sort()) {
    const url = `${API_BASE}/${prefix}.json?icons=${iconNames.map((name) => name.split(':')[1]).join(',')}`;
    process.stdout.write(`拉取 ${prefix}（${iconNames.length} 个）...`);
    let data;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        data = await res.json();
    } catch (error) {
        console.log(' 失败');
        console.error(`拉取失败：${prefix} -> ${error.message}`);
        console.error(
            '请检查网络（数据源为 api.iconify.design）；如需改用本地 @iconify-json 包，请安装对应包后调整本脚本。',
        );
        process.exit(1);
    }
    const icons = data.icons ?? {};
    // 顶层 width/height 是该集合的默认尺寸（图标内部值优先）。若不应用默认值，
    // @iconify/vue 会按 16×16 默认 viewBox 渲染 256 坐标系绘制的图形，导致图标放大错位溢出。
    const defaultWidth = data.width;
    const defaultHeight = data.height;
    const got = Object.keys(icons).length;
    console.log(` 成功（返回 ${got} 个）`);
    for (const name of iconNames) {
        // API 响应的 icons 以「不带前缀的短名」为 key（如 python 而非 logos:python）。
        const icon = icons[name.split(':')[1]];
        if (!icon) {
            missing.push(name);
            continue;
        }
        const { body, left, top, width, height, rotate, hFlip, vFlip } = icon;
        const entry = { body };
        if (left !== undefined) entry.left = left;
        if (top !== undefined) entry.top = top;
        if (rotate !== undefined) entry.rotate = rotate;
        if (hFlip !== undefined) entry.hFlip = hFlip;
        if (vFlip !== undefined) entry.vFlip = vFlip;
        const finalWidth = width ?? defaultWidth;
        const finalHeight = height ?? defaultHeight;
        if (finalWidth !== undefined) entry.width = finalWidth;
        if (finalHeight !== undefined) entry.height = finalHeight;
        entries.push([name, entry]);
    }
}

// 4. 缺失图标校验。
if (missing.length > 0) {
    const detail = missing.map((name) => `  ${name}（引用自：${found.get(name).join(', ')}）`).join('\n');
    if (allowMissing) {
        console.warn(`\n警告：以下 ${missing.length} 个图标在 Iconify 中不存在，已跳过：\n${detail}`);
    } else {
        console.error(`\n错误：以下 ${missing.length} 个图标在 Iconify 中不存在：\n${detail}`);
        console.error('请修正图标名（或改用该站点 favicon 图标），然后重新运行本脚本。');
        process.exit(1);
    }
}

// 5. 生成注册表文件。
const header = [
    '// 本文件由 scripts/staticize.mjs 自动生成，请勿手动编辑。',
    '// 新增或修改图标引用后重新生成：node scripts/staticize.mjs',
    '// 数据来源：Iconify API（https://api.iconify.design）',
];
const iconsRecord = Object.fromEntries(entries);
const fileContent =
    `${header.join('\n')}\n` +
    `import { addIcon, type IconifyIcon } from '@iconify/vue/offline';\n\n` +
    `const icons: Record<string, IconifyIcon> = ${JSON.stringify(iconsRecord, null, 4)};\n\n` +
    `for (const [name, data] of Object.entries(icons)) {\n` +
    `    addIcon(name, data);\n` +
    `}\n`;
writeFileSync(OUT_FILE, fileContent, 'utf8');

const sizeKB = (Buffer.byteLength(fileContent, 'utf8') / 1024).toFixed(1);
console.log(`\n已生成 ${OUT_FILE}（${entries.length} 个图标，${sizeKB} KB，原始未压缩）。`);
console.log('下一步：pnpm run format（oxfmt 将注册表格式化为仓库风格），再 pnpm run build:refs 验证。');
