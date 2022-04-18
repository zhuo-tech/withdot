import { onMounted, onUnmounted } from 'vue'

/**
 * <h3>监听 DOM 元素大小变化</h3>
 * 注意: 生命周期回调的执行 必须在 vue setup 期间; <br>
 * 注意: domSupplier 执行时机 <br>
 * @param {(width: number, height: number) => void} resize 事件监听回调; 如果未提供 DOM 且 浏览器不支持 ResizeObserver, width height 都是 0
 * @param {() => HTMLElement} domSupplier 可选, 监听的目标 DOM
 * @author LL
 * @date 2022-04-17 下午 1:20
 */
export function useResizeMonitor(resize: (width: number, height: number) => void, domSupplier?: () => HTMLElement) {
    // 优先使用 ResizeObserver
    if (domSupplier && ResizeObserver) {
        // noinspection JSUnusedLocalSymbols
        const ro = new ResizeObserver((entries, observer) => {
            const {width, height} = entries[0].contentRect
            resize(width, height)
        })

        onMounted(() => ro.observe(domSupplier()))
        onUnmounted(() => ro.unobserve(domSupplier()))
        return
    }

    // 备用方案: 使用 window.resize  如果浏览器已经全屏, 元素全屏不会触发 resize
    // noinspection JSUnusedLocalSymbols
    const eventCallback = (event: UIEvent) => {
        const dom = domSupplier?.()
        if (dom) {
            const {width, height} = dom.getBoundingClientRect()
            resize(width, height)
        } else {
            resize(0, 0)
        }
    }
    onMounted(() => window.addEventListener('resize', eventCallback, {passive: true}))
    onUnmounted(() => window.removeEventListener('resize', eventCallback))
}
