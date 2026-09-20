import type { Badge } from '@navifox/types';

/**
 * 品牌徽章。
 *
 * - 用于展示品牌相关场景时用的徽章。
 * - 只负责品牌自己的图标：同一个品牌如果另有更适合技能展示的图标，它在 {@link SkillsBadge}
 *   里是另一个条目，两者不合并。
 */
export class BrandsBadge {
    static readonly Kotlin: Badge = { logo: 'logos:kotlin-icon' };
    static readonly Golang: Badge = { logo: 'logos:go' };
    static readonly Django: Badge = { logo: 'logos:django-icon' };
    static readonly Bootstrap: Badge = { logo: 'logos:bootstrap' };
    static readonly TailwindCSS: Badge = { logo: 'logos:tailwindcss-icon' };
    static readonly Vue: Badge = { logo: 'logos:vue' };
    static readonly PostgreSQL: Badge = { logo: 'logos:postgresql' };
    static readonly Git: Badge = { logo: 'logos:git-icon' };
    static readonly Npm: Badge = { logo: 'devicon:npm' };
    static readonly Pnpm: Badge = { logo: 'devicon:pnpm' };
    static readonly Vite: Badge = { logo: 'logos:vitejs' };
    static readonly VisualStudioCode: Badge = { logo: 'devicon:vscode' };
    static readonly JetBrains: Badge = { logo: 'logos:jetbrains' };
    static readonly Cursor: Badge = { logo: 'devicon:cursor' };
    static readonly Kimi: Badge = { logo: 'simple-icons:kimi' };
    static readonly Nginx: Badge = { logo: 'logos:nginx' };
    static readonly Element: Badge = { logo: 'logos:element' };
    static readonly HuggingFace: Badge = { logo: 'devicon:huggingface' };
    static readonly Ollama: Badge = { logo: 'simple-icons:ollama' };
    static readonly DeepSeek: Badge = { logo: 'logos:deepseek' };
    static readonly Nvidia: Badge = { logo: 'logos:nvidia' };
    static readonly Minecraft: Badge = { logo: 'vscode-icons:file-type-minecraft' };

    // -------------------------------- --------------------------------

    static get values(): Badge[] {
        return Object.values(this);
    }
}
