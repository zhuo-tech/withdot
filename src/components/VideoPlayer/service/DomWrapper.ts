/**
 * 对 DOM 对象的包装 <br>
 * 应该持有 Wrapper 而不直接持有 DOM 对象, 原因如下:
 * - 可以在不同组件内共享 同一个 DOM 对象, 真实 DOM 延迟初始化
 * - 在原生 DOM 之外提供额外功能
 * - 监控DOM操作
 *
 * 如果无上述需要, 无需使用包装
 */
export interface DomWrapper<E extends Element> {
    /**
     * 延迟初始化 element
     * <h4 color="yellow">如果此方法没有得到调用, 即 Wrapper 对象未初始化, 建议但不强制所有对 DOM 的操作抛出 {@link DomWrapperInitializeError} </h4>
     * 允许重复多次调用, 忽略相同引用的赋值
     * @param {E} element 元素
     */
    setElement(element: E): void

    /**
     * 注册初始化完成的回调, 在 {@link setElement} 每次有效的执行后被调用, 多次调用会重复添加. <br>
     * 这里的初始化特指 DOM 对象引用的初始化, 不一定指 image video 这类的资源加载完成
     * @return 注册的回调函数的 key, 用于在此 Wrapper 对象上 移除此回调 (如果支持)
     */
    onInitializeFinish(callback: () => void): number

    /**
     * 移除指定回调函数
     * @param {number} key
     */
    removeCallback?: (key: number) => void

}

/**
 * 如果出现此错误, 请审视对 DOM 的操作是否在初始化之前
 * 如果不能准确把握初始化顺序, 请注册初始化回调进行操作
 * @see DomWrapper#onInitializeFinish
 */
export class DomWrapperInitializeError extends Error {
    public name: string = DomWrapperInitializeError.name
    public message: string

    constructor(message: string = '') {
        super(message)
        this.message = message
    }
}
