// noinspection JSUnusedGlobalSymbols

/**
 * LogLevel
 * @author LL
 * @date 2022-01-19 下午 03:27
 **/
export enum LoggerLevel {
    /**
     * 全部
     * @type {LoggerLevel.ALL}
     */
    ALL = -1,
    /**
     * 详细
     * @type {LoggerLevel.TRACE}
     */
    TRACE = 0,
    /**
     * 调试
     * @type {LoggerLevel.DEBUG}
     */
    DEBUG = 10,
    /**
     * 信息
     * @type {LoggerLevel.INFO}
     */
    INFO = 100,
    /**
     * 警告
     * @type {LoggerLevel.WARN}
     */
    WARN = 1000,
    /**
     * 错误
     * @type {LoggerLevel.ERROR}
     */
    ERROR = 10000,
    /**
     * 关闭
     * @type {LoggerLevel.OFF}
     */
    OFF = 2 << 30,
}

export const LoggerLevelDisplayName: Record<LoggerLevel, string> = {
    [LoggerLevel.ALL]: '全部',
    [LoggerLevel.TRACE]: '跟踪',
    [LoggerLevel.DEBUG]: '调试',
    [LoggerLevel.INFO]: '信息',
    [LoggerLevel.WARN]: '警告',
    [LoggerLevel.ERROR]: '错误',
    [LoggerLevel.OFF]: '关闭',
}
