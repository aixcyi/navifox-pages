import type { Badge } from '@navifox/types';

/**
 * 品牌徽章。
 *
 * - 用于展示品牌相关场景时用的徽章。
 * - 图标一般都会占满或几乎占满整个画布。
 * - 图标可能没那么圆润，相对会锋利一些，比较适合大尺寸的直观展示。
 * - 每个徽章都带上了 {@link Badge.text} 字段。
 */
export class BrandsBadge {
    static readonly Golang: Badge = { logo: 'logos:go' };
    static readonly VisualStudioCode: Badge = { logo: 'devicon:vscode' };
    static readonly JetBrains: Badge = { logo: 'logos:jetbrains' };
    static readonly Cursor: Badge = { logo: 'devicon:cursor' };
    static readonly Kimi: Badge = { logo: 'simple-icons:kimi' };
    static readonly HuggingFace: Badge = { logo: 'devicon:huggingface' };
    static readonly Ollama: Badge = { logo: 'simple-icons:ollama' };
    static readonly DeepSeek: Badge = { logo: 'logos:deepseek' };
    static readonly Nvidia: Badge = { logo: 'logos:nvidia' };
    static readonly Minecraft: Badge = { logo: 'vscode-icons:file-type-minecraft' };

    // -------------------------------- --------------------------------

    static {
        for (const [keyName, value] of Object.entries(this)) {
            value.text = value?.text ?? keyName;
        }
    }

    static get values(): Badge[] {
        return Object.values(this);
    }
}
