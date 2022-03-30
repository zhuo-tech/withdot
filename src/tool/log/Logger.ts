import { LoggerLevel } from './LoggerLevel'

/**
 * Logger
 * @author LL
 * @date 2022-01-19 下午 03:27
 **/
export interface Logger {
    /**
     * 获取日志记录器名称
     * @return {string}
     */
    getLoggerName(): string;

    getDebugLevel(): LoggerLevel | undefined

    trace(...args: any): void;

    debug(...args: any): void;

    info(...args: any): void;

    warn(...args: any): void;

    error(...args: any): void;

    isTraceEnable(): boolean;

    isDebugEnable(): boolean;

    isInfoEnable(): boolean;

    isWarnEnable(): boolean;

    isErrorEnable(): boolean;
}
