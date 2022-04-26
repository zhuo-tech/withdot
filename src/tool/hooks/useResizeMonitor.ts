import { onBeforeUnmount, onMounted } from 'vue'

/**
 * <h3>监听 DOM 元素大小变化</h3>
 * @author LL
 * @date 2022-04-17 下午 1:20
 */
export function useResizeMonitor(resize: (width: number, height: number) => void, domSupplier?: () => HTMLElement) {
    if (domSupplier && ResizeObserver) {
        useObserver(resize, domSupplier)
    } else {
        useWindow(resize, domSupplier)
    }
}

/**
 * ResizeObserver
 */
function useObserver(resize: (width: number, height: number) => void, domSupplier: () => HTMLElement) {
    const ro = new ResizeObserver((entries) => {
        const {width, height} = entries[0].contentRect
        resize(width, height)
    })

    onMounted(() => ro.observe(domSupplier()))
    onBeforeUnmount(() => ro.unobserve(domSupplier()))
}

/**
 * 备用方案: 使用 window.resize  如果浏览器已经全屏, 元素全屏不会触发 resize
 */
function useWindow(resize: (width: number, height: number) => void, domSupplier?: () => HTMLElement) {
    const listener = () => {
        const dom = domSupplier?.()
        if (dom) {
            const {width, height} = dom.getBoundingClientRect()
            resize(width, height)
        }
    }
    onMounted(() => window.addEventListener('resize', listener, {passive: true}))
    onBeforeUnmount(() => window.removeEventListener('resize', listener))
}
