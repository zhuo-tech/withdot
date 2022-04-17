/**
 * 节流 指定时间间隔内最多执行一次; 连续的多次调用仅第一次执行, 其余丢弃;
 * @param msTime {number} 防抖延迟, 单位毫秒; msTime 时间段内 能且只能执行一次
 * @target Methods 仅能用于方法/函数
 * @author LL
 * @date 2022-04-15 上午 01:04
 **/
export function Throttling(msTime: number) {
    return (target: { constructor: Function } & any, name: PropertyKey, descriptor: PropertyDescriptor) => {

        let lastExecutionTime: number | null = null
        const primitiveFun: Function = descriptor.value

        descriptor.value = function () {
            const now = Date.now()
            if (now - (lastExecutionTime ?? 0) <= msTime) {
                return null
            }
            lastExecutionTime = now
            return primitiveFun.apply(this, arguments)
        }
    }
}

/**
 * 防抖: 连续的重复调用, 仅执行最后一次; <br>
 * 如果多次调用的时间间隔一直小于 timeInterval 此调用将一直等待. <br>
 * <p style="color: red">因为最终函数需要包裹一层 setTimeout, 所以包装之后的函数会丢失返回值 </p>
 * @param timeInterval {number} 判定重复的时间间隔, 单位毫秒; 两次调用间隔时间小于 timeInterval 视为重复
 * @target Methods 仅能用于方法/函数
 * @author LL
 * @date 2022-04-15 上午 01:04
 */
export function Debounce(timeInterval: number) {
    return (target: { constructor: Function } & any, name: PropertyKey, descriptor: PropertyDescriptor) => {
        let timer: any = null
        const primitiveFun: Function = descriptor.value

        descriptor.value = function () {
            if (timer != null) {
                window.clearTimeout(timer)
            }
            const _this = this
            const arg = arguments
            timer = window.setTimeout(function () {
                primitiveFun.apply(_this, arg)
                timer = null
            }, timeInterval)
        }
    }
}
