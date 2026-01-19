// https://developer.mozilla.org/zh-CN/docs/Web/API/console
// https://developer.chrome.com/docs/devtools/console/format-style?hl=zh-cn


type LogLevel = { name: string, style: string }

export class Logger {
    static DEBUG = { name: 'DEBUG', style: 'color: lightgrey' } as LogLevel
    static INFO = { name: 'INFO', style: 'color: deepskyblue' } as LogLevel
    static WARN = { name: 'WARN', style: 'color: orange' } as LogLevel
    static ERROR = { name: 'ERROR', style: 'color: red' } as LogLevel

    user: string
    mainDomain: string

    constructor(user: string, host: string) {
        this.user = user
        this.mainDomain = host.split('.').slice(-2).join('.')
    }

    log(level: LogLevel, msg: string, style: string) {
        console.log(
            `%c[%c${this.user}%c@%c${this.mainDomain}%c] %c[${level.name}] %c${msg}`,
            'color: cyan;',
            'color: violet;',
            'color: cyan;',
            'color: lightseagreen;',
            'color: cyan;',
            level.style,
            style,
        )
    }

    debug = (msg: string, style: string = '') => this.log(Logger.DEBUG, msg, style)
    info = (msg: string, style: string = '') => this.log(Logger.INFO, msg, style)
    warn = (msg: string, style: string = '') => this.log(Logger.WARN, msg, style)
    error = (msg: string, style: string = '') => this.log(Logger.ERROR, msg, style)

    print(msg: string, ...style: string[]) {
        console.log(
            `%c[%c${this.user}%c@%c${this.mainDomain}%c]%c ${msg}`,
            'color: cyan;',
            'color: violet;',
            'color: cyan;',
            'color: lightseagreen;',
            'color: cyan;',
            '',
            ...style,
        )
    }

    draw(art: string, color: string) {
        console.log('%c' + art, `color: ${color}; font-size: 12px; font-family: Consolas;`)
    }
}

export const logger = new Logger('tighnari', location.hostname)
