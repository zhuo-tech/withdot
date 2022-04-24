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
        element.value.style.left = end.left + 'px'
        element.value.style.top = end.top + 'px'
    }

    return {
        start(event: MouseEvent) {
            enable.value = true
            offsetX = event.offsetX
            offsetY = event.offsetY
            startRect = element.value.getBoundingClientRect()
            start = event
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
