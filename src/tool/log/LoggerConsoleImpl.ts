import { Logger } from './Logger'
import { LoggerLevel, LoggerLevelDisplayName } from './LoggerLevel'

/**
 * LoggerConsoleImpl
 * @author LL
 * @date 2022-01-19 下午 03:36
 **/
export class LoggerConsoleImpl implements Logger {

    private static readonly levelColor: Record<LoggerLevel, string> = {
        [LoggerLevel.TRACE]: '#717C86',
        [LoggerLevel.DEBUG]: '#40C2F8',
        [LoggerLevel.INFO]: '#128726',
        [LoggerLevel.WARN]: '#CABD2C',
        [LoggerLevel.ERROR]: '#FF0000',
    }
    private readonly name: string
    private readonly debugLevel?: LoggerLevel
    private readonly controller: (level: LoggerLevel, name: string) => boolean

    constructor(name: string, controller: (level: LoggerLevel, name: string) => boolean, debugLevel?: LoggerLevel) {
        this.name = name
        this.controller = controller
        this.debugLevel = debugLevel
    }

    public getLoggerName(): string {
        return this.name
    }

    public getDebugLevel(): LoggerLevel | undefined {
        return this.debugLevel
    }

    public debug(...args: any): void {
        this.log(LoggerLevel.DEBUG, ...args)
    }

    public error(...args: any): void {
        this.log(LoggerLevel.ERROR, ...args)
    }

    public info(...args: any): void {
        this.log(LoggerLevel.INFO, ...args)
    }

    public trace(...args: any): void {
        this.log(LoggerLevel.TRACE, ...args)
    }

    public warn(...args: any): void {
        this.log(LoggerLevel.WARN, ...args)
    }

    public isDebugEnable(): boolean {
        return this.controller(LoggerLevel.DEBUG, this.name)
    }

    public isErrorEnable(): boolean {
        return this.controller(LoggerLevel.ERROR, this.name)
    }

    public isInfoEnable(): boolean {
        return this.controller(LoggerLevel.INFO, this.name)
    }

    public isTraceEnable(): boolean {
        return this.controller(LoggerLevel.TRACE, this.name)
    }

    public isWarnEnable(): boolean {
        return this.controller(LoggerLevel.WARN, this.name)
    }

    private log(level: LoggerLevel, ...args: any): void {
        if (!this.controller(level, this.name)) {
            return
        }

        switch (level) {
            case LoggerLevel.TRACE:
                console.debug(...this.formatInfo(LoggerLevel.TRACE), ...args)
                break
            case LoggerLevel.DEBUG:
                console.debug(...this.formatInfo(LoggerLevel.DEBUG), ...args)
                break
            case LoggerLevel.INFO:
                console.info(...this.formatInfo(LoggerLevel.INFO), ...args)
                break
            case LoggerLevel.WARN:
                console.warn(...this.formatInfo(LoggerLevel.WARN), ...args)
                break
            case LoggerLevel.ERROR:
                console.error(...this.formatInfo(LoggerLevel.ERROR), ...args)
                break
            default:
        }
    }

    private formatInfo(level: LoggerLevel): string[] {
        return [
            `%c ${ new Date().toLocaleTimeString() } %c${ LoggerLevelDisplayName[level] }%c - [${ this.name }]: `,
            'color: #717C86; background: #030307;',
            `color: ${ LoggerConsoleImpl.levelColor[level] }; background: #030307;`,
            'color: #da30f5; background: #030307;',
        ]
    }

}
