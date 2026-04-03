import type { Badge } from '@navifox/types';

/**
 * 彩色徽章。
 */
export class ColorBadge {

    // -------------------------------- 语言类 --------------------------------

    static readonly Python: Badge = { logo: 'devicon:python' }
    static readonly Kotlin: Badge = { logo: 'devicon:kotlin' }
    static readonly Golang: Badge = { logo: 'devicon:go' }
    static readonly Rust: Badge = { logo: 'catppuccin:rust' }
    static readonly Java: Badge = { logo: 'devicon:java' }
    static readonly JavaScript: Badge = { logo: 'devicon:javascript' }
    static readonly TypeScript: Badge = { logo: 'devicon:typescript' }
    static readonly WebHTML: Badge = { logo: 'catppuccin:html', text: 'HTML' }
    static readonly WebCSS: Badge = { logo: 'devicon:css', text: 'CSS' }
    static readonly Markdown: Badge = { logo: 'catppuccin:markdown' }
    static readonly Bash: Badge = { logo: 'devicon-plain:bash', text: 'bash' }
    static readonly Cmd: Badge = { logo: 'codicon:terminal-cmd', text: 'cmd' }
    static readonly Powershell: Badge = { logo: 'devicon:powershell' }
    static readonly NuShell: Badge = { logo: 'simple-icons:nushell' }

    // -------------------------------- 框架类 --------------------------------

    // 后端开发
    static readonly Django: Badge = { logo: 'skill-icons:django' }
    static readonly DjangoRESTFramework: Badge = { logo: 'devicon:djangorest-wordmark', text: 'Django REST Framework' }
    static readonly Flask: Badge = { logo: 'file-icons:flask' }
    static readonly FastAPI: Badge = { logo: 'devicon:fastapi' }
    static readonly NumPy: Badge = { logo: 'devicon:numpy' }
    static readonly Pandas: Badge = { logo: 'devicon:pandas' }
    static readonly Selenium: Badge = { logo: 'logos:selenium' }
    static readonly Celery: Badge = { logo: 'simple-icons:celery' }
    static readonly Spring: Badge = { logo: 'devicon:spring' }

    // 前端开发
    static readonly TailwindCSS: Badge = { logo: 'devicon:tailwindcss', text: 'Tailwind CSS' }
    static readonly Vue: Badge = { logo: 'devicon:vuejs' }
    static readonly VueUse: Badge = { logo: 'logos:vueuse' }
    static readonly Pinia: Badge = { logo: 'logos:pinia' }
    static readonly Gsap: Badge = { logo: 'simple-icons:gsap', text: 'GSAP' }
    static readonly VitePress: Badge = { logo: 'simple-icons:vitepress' }
    static readonly Bootstrap: Badge = { logo: 'devicon:bootstrap' }
    static readonly Naive: Badge = { logo: 'logos:naiveui' }

    // -------------------------------- 存储类 --------------------------------

    static readonly PostgreSQL: Badge = { logo: 'devicon:postgresql' }
    static readonly SQLite: Badge = { logo: 'devicon:sqlite' }
    static readonly MySQL: Badge = { logo: 'devicon:mysql' }
    static readonly Redis: Badge = { logo: 'devicon:redis' }

    // -------------------------------- 环境类 --------------------------------

    static readonly PyCharm: Badge = { logo: 'logos:pycharm' }
    static readonly IntelliJ: Badge = { logo: 'logos:intellij-idea' }
    static readonly WebStorm: Badge = { logo: 'logos:webstorm' }
    static readonly Goland: Badge = { logo: 'logos:goland' }
    static readonly DataGrip: Badge = { logo: 'logos:datagrip' }
    static readonly VisualStudioCode: Badge = { logo: 'devicon:vscode', text: 'Visual Studio Code' }
    static readonly VisualStudio: Badge = { logo: 'devicon:visualstudio', text: 'Visual Studio' }
    static readonly Ubuntu: Badge = { logo: 'logos:ubuntu' }
    static readonly Kali: Badge = { logo: 'devicon:kalilinux' }

    // -------------------------------- DevOps --------------------------------

    static readonly Git: Badge = { logo: 'devicon:git', text: 'git' }
    static readonly GitHubAction: Badge = { logo: 'devicon:githubactions', text: 'GitHub Action' }
    static readonly Apifox: Badge = { logo: 'simple-icons:apifox' }
    static readonly Grafana: Badge = { logo: 'devicon:grafana' }

    // -------------------------------- 工具类 --------------------------------

    static readonly Vite: Badge = { logo: 'devicon:vitejs' }
    static readonly Npm: Badge = { logo: 'devicon:npm', text: 'NPM' }
    static readonly Pnpm: Badge = { logo: 'devicon:pnpm', text: 'PNPM' }

    // -------------------------------- 杂类 --------------------------------

    static readonly Firefox: Badge = { logo: 'logos:firefox' }
    static readonly Chrome: Badge = { logo: 'logos:chrome' }

    // -------------------------------- --------------------------------

    static {
        for (const [ keyName, value ] of Object.entries(this)) {
            value.text = value?.text ?? keyName
        }
    }

    static get values(): Badge[] {
        return Object.values(this).sort((a: Badge, b: Badge) => a.text!.localeCompare(b.text!))
    }
}
