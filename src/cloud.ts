import { LAF } from '@/config'
import { Cloud } from 'laf-client-sdk'
import { LafWrapperConfig, LoggerLevel } from 'laf-db-query-wrapper'
import { getToken } from './api/token'

export const cloud = new Cloud({
    baseUrl: LAF.BASE_URL,
    getAccessToken: () => getToken(),
    dbProxyUrl: LAF.DB_PROXY,
})

/* 包装器 cloud 引用注入 */
LafWrapperConfig.cloud = () => cloud
// 设置 LoggerLevel.TRACE 可以启用 wrapper 层日志
LafWrapperConfig.LoggerFactory.enableLevel = LoggerLevel.WARN
