import { Ref, ref } from 'vue'

type Location = Pick<MouseEvent, 'pageX' | 'pageY'>

/**
 * useDraggable
 * @author LL
 * @date 2022-04-24 上午 1:17
 **/
export function useDraggable(element: Ref<HTMLDivElement>, boxRect: () => DOMRect) {
    const enable = ref(false)

    let startRect: DOMRect
    let start: Location
    // 貌似没用了
    let offsetX = 0
    let offsetY = 0

    const mouseMove = (event: MouseEvent) => {
        if (!enable.value) {
            return
        }
        const {pageX, pageY} = event
        const {pageX: oldX, pageY: oldY} = start
        const {top: boxTop, left: boxLeft} = boxRect()

        const change = {
            x: pageX - oldX - boxLeft,
            y: pageY - oldY - boxTop,
        }

        // 应用更改
        const {left = 0, top = 0} = startRect
        element.value.style.left = left + change.x + 'px'
        element.value.style.top = top + change.y + 'px'
    }

    return {
        start(event: MouseEvent) {
            enable.value = true
            offsetX = event.offsetX
            offsetY = event.offsetY
            startRect = element.value.getBoundingClientRect()
            start = event

            console.debug('开始拖动: ', {startRect, start})

            document.addEventListener('mousemove', mouseMove)
        },
        stop() {
            if (enable.value) {
                enable.value = false
                document.removeEventListener('mousemove', mouseMove)
            }
        },

    }
}
