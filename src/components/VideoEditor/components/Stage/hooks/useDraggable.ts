import { reactive, Ref, ref } from 'vue'

type Location = Pick<MouseEvent, 'pageX' | 'pageY'>

export type DraggableLocation = {
    left: number
    top: number
    lastTime: number
}

export type DraggableReturn = {
    /**
     * 开始拖动
     */
    start: (event: MouseEvent) => void
    /**
     * 停止拖动
     */
    stop: () => void
    /**
     * 使用给定 location 和 boxRect 重置定位
     */
    reset: (location: DraggableLocation) => void
    /**
     * 维护的定位信息 和 最后一次操作时间戳
     */
    location: DraggableLocation
}

/**
 * 开始拖动时的临时 zIndex
 */
const TEMP_Z_INDEX = '1000'

/**
 * useDraggable
 *
 * @author LL
 * @date 2022-04-24 上午 1:17
 * @param {Ref<HTMLDivElement>} element 目标元素
 * @param {() => DOMRect} boxRect 父容器
 * @param {DraggableLocation} initLocation 初始值
 * @param onChange 变化后的回调
 * @return DraggableReturn
 */
export function useDraggable(element: Ref<HTMLDivElement>, boxRect: () => DOMRect, initLocation?: Partial<DraggableLocation>, onChange?: () => void): DraggableReturn {
    const enable = ref(false)
    const location = reactive({
        left: initLocation?.left ?? 0,
        top: initLocation?.top ?? 0,
        lastTime: Date.now(),
    })
    let oldZIndex = '0'
    let startRect: DOMRect
    let start: Location

    const mouseMove = (event: MouseEvent) => {
        if (!enable.value) {
            return
        }
        const {pageX, pageY} = event
        const {pageX: oldX, pageY: oldY} = start
        const {top: boxTop, left: boxLeft, width: pw, height: ph} = boxRect()
        const {width, height} = element.value.getBoundingClientRect()

        const change = {
            left: pageX - oldX - boxLeft,
            top: pageY - oldY - boxTop,
        }

        // 越界修正
        const {left = 0, top = 0} = startRect
        const end = {
            left: Math.min(Math.max(left + change.left, 0), pw - width),
            top: Math.min(Math.max(top + change.top, 0), ph - height),
        }

        // 应用更改
        location.left = end.left / pw
        location.top = end.top / ph
        location.lastTime = Date.now()

        element.value.style.left = end.left + 'px'
        element.value.style.top = end.top + 'px'

        onChange?.()
    }

    return {
        location,
        start(event: MouseEvent) {
            enable.value = true
            startRect = element.value.getBoundingClientRect()
            start = event

            oldZIndex = element.value.style.zIndex
            element.value.style.zIndex = TEMP_Z_INDEX

            document.addEventListener('mousemove', mouseMove)
        },
        stop() {
            if (enable.value) {
                enable.value = false
                element.value.style.zIndex = oldZIndex

                document.removeEventListener('mousemove', mouseMove)
            }
        },
        reset(newLocation = location) {
            const {top, left} = newLocation
            const {width, height} = boxRect()
            element.value.style.left = width * left + 'px'
            element.value.style.top = height + top + 'px'
        },
    }
}
