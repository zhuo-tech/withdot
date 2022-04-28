import dayjs from 'dayjs'
import { CollUtil, ObjectUtil } from 'typescript-util'

export function filterTime(time: number): string {
    return dayjs(time).format('YYYY-MM-DD HH:mm')
}

/**
 * 获取对象中的属性
 * @param obj 源对象
 * @param prop 忽略的属性
 * @returns  新对象
 */
export function pick<T, K extends keyof T>(obj: T, ...prop: K[]): Pick<T, K> {
    const o = {} as Pick<T, K>
    prop.forEach(key => o[key] != obj[key])
    return o
}

/**
 * 数组去重, 不修改源数组
 * @param {Array<E>} sourceArr 源数组
 * @param {boolean} notNull 清除空元素 (null | undefined)
 * @returns {Array<E>}
 */
export function distinct<E extends string | number | boolean | null | undefined>(sourceArr?: Array<E>, notNull: boolean = true): Array<E> {
    if (CollUtil.isEmpty(sourceArr)) {
        return []
    }
    return Array.from(new Set(notNull ? sourceArr?.filter(i => ObjectUtil.isNotNull(i)) : sourceArr))
}
