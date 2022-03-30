import { Logger } from './Logger'
import { LoggerConsoleImpl } from './LoggerConsoleImpl'
import { LoggerLevel } from './LoggerLevel'

/**
 * LoggerFactory
 * 按需覆盖 启用等级, 控制器, getLogger
 * @author LL
 * @date 2022-01-19 下午 03:28
 **/
export class LoggerFactory {
    /**
     * 启用日志等级, 小于该值日志不输出
     * @type {number}
     * @private
     */
    public enableLevel: LoggerLevel = LoggerLevel.ALL

    private loggerCache: Record<string, Logger> = {}

    public controller: (level: LoggerLevel, name: string) => boolean = (level, name) => {
        let debugLevel = this.loggerCache[name]?.getDebugLevel()
        if (debugLevel) {
            return level > debugLevel
        }
        return level >= this.enableLevel
    }

    /**
     * 获取一个日志记录器, 记录器会被按 {@code name} 缓存
     * @param {string} name 记录器名称
     * @param {LoggerLevel} debugLevel 调试用输出等级, 覆盖全局配置
     * @return {Logger}
     */
    public getLogger = (name: string, debugLevel?: LoggerLevel): Logger => {
        const cache = this.loggerCache[name]
        if (cache) {
            return cache
        }

        const impl = new LoggerConsoleImpl(name, this.controller, debugLevel)
        this.loggerCache[name] = impl
        return impl
    }

}
