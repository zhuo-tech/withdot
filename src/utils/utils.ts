import  dayjs from 'dayjs'

export function filterTime(time: number): string {
    return dayjs(time).format('YYYY-MM-DD HH:mm')
}

/**
 * 获取对象中的属性
 * @param obj 源对象
 * @param prop 忽略的属性
 * @returns  新对象
 */
export function pick<T,K extends keyof T>(obj: T,...prop: K[]): Pick<T,K> {
    const o = {} as Pick<T,K>;
    prop.forEach(key => o[key] != obj[key]);
    return o;
}
