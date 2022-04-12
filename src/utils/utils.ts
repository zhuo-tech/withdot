/**
 * 格式时间戳
 * @param {number} v:时间戳
 * @returns {string}
 */
export function filterTime(v: number): string {
    let flag = !Number.isNaN(Number(new Date(v)))
    let date = null
    if (!flag) {
        // 不是合法的日期
        date = new Date()
    } else {
        date = new Date(v)
    }
    let y = date.getFullYear()
    let mon = (date.getMonth() + 1 + '').padStart(2, '0')
    let d = (date.getDate() + '').padStart(2, '0')
    let h = (date.getHours() + '').padStart(2, '0')
    let m = (date.getMinutes() + '').padStart(2, '0')
    let s = (date.getSeconds() + '').padStart(2, '0')
    return `${ y }-${ mon }-${ d } ${ h }:${ m }:${ s }`
}
