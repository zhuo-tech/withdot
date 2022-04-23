import { ObjectUtil } from 'typescript-util'
import { onMounted, onUnmounted, Ref, ref } from 'vue'

/**
 * useResizableContainer
 * @author LL
 * @date 2022-04-24 上午 12:39
 **/
export function useResizable(element: Ref<HTMLDivElement>) {
    const isShow = ref(false)

    // 被拖动的目标, 仅用来判断是否处于拖动状态
    let dragTarget: HTMLDivElement | null
    // 拖动起点
    let dragStart: { pageX: number, pageY: number } | null
    // 拖动初始大小
    let resizableStart: DOMRect | null

    const close = () => {
        if (isShow.value) {
            isShow.value = false
        }
    }

    onMounted((() => document.addEventListener('click', close)))
    onUnmounted(() => document.removeEventListener('click', close))

    return {
        isShow,
        close,
        show() {
            isShow.value = true
        },
        start(event: MouseEvent, type: ResizableType) {
            dragTarget = event.target as any
            dragStart = {pageX: event.pageX, pageY: event.pageY}
            resizableStart = element.value.getBoundingClientRect()

            const move = (event: MouseEvent) => {
                if (!dragTarget) {
                    return
                }
                if (!resizableStart || !dragStart) {
                    console.error('意料之外: resizableRefStart  dragStart  未初始化')
                    return
                }
                mouseMove(event, type, dragStart, resizableStart, element)
            }

            // 一次性事件监听: 开始拖动后 任意 mouseup 将导致拖动结束
            const mouseUp = () => {
                if (dragTarget) {
                    dragTarget = null
                    dragStart = null
                    resizableStart = null
                }
                document.removeEventListener('mouseup', mouseUp)
                document.removeEventListener('mousemove', move)
            }

            document.addEventListener('mouseup', mouseUp, {passive: false})
            document.addEventListener('mousemove', move, {passive: false})
        },
    }
}

/**
 * @param {MouseEvent} event 鼠标移动事件
 * @param {ResizableType} type 移动的控件类型
 * @param {{pageX: number, pageY: number}} dragStart 移动起点
 * @param {DOMRect} resizableStart 容器初始大小
 * @param {HTMLDivElement} element 容器元素
 */
function mouseMove(event: MouseEvent, type: ResizableType, dragStart: { pageX: number, pageY: number }, resizableStart: DOMRect, element: Ref<HTMLDivElement>) {
    // 当前鼠标位置
    const {pageX: x, pageY: y} = event
    // 按下鼠标时, 盒子的宽高
    const {width, height, left, top} = resizableStart
    // 按下鼠标时的起点位置
    const {pageX: oldX, pageY: oldY} = dragStart

    // 鼠标坐标变化值: 正数表示向右下移动, 负数表示左上.
    const change: { w: number, h: number, pl: number, pt: number } = {
        w: x - oldX,
        h: y - oldY,
        pl: 0,
        pt: 0,
    }

    // 鼠标坐标变化值 应如何改变盒子大小
    switch (type) {
        // 四角: 改变宽高
        case ResizableType.TOP_LEFT: {
            change.w = -change.w
            change.h = -change.h
            change.pl = change.w
            change.pt = change.h
            break
        }
        case ResizableType.TOP_RIGHT: {
            change.h = -change.h
            change.pt = change.h
            break
        }
        case ResizableType.BOTTOM_LEFT:
            change.pl = change.w
            break
        case ResizableType.BOTTOM_RIGHT:
            // 无事发生
            break
        // 上下边框: 改变高度
        case ResizableType.TOP_CENTER:
        case ResizableType.BOTTOM_CENTER: {
            change.w = 0
            if (type === ResizableType.TOP_CENTER) {
                change.h = -change.h
                change.pt = change.h
            }
            break
        }
        // 左右边框: 改变宽度
        case ResizableType.CENTER_LEFT:
        case ResizableType.CENTER_RIGHT: {
            change.h = 0
            if (type === ResizableType.CENTER_LEFT) {
                change.w = -change.w
                change.pl = change.w
            }
            break
        }
        default:

    }

    const rect: Partial<DOMRect> = {
        width: width + change.w,
        height: height + change.h,
        left: left + change.pl,
        top: top + change.pt,
    }

    // render
    ObjectUtil.forEach(rect as any, (key, value) => element.value.style[key] = value + 'px')
}

export enum ResizableType {
    TOP_LEFT = 'tl',
    TOP_CENTER = 'tc',
    TOP_RIGHT = 'tr',
    CENTER_LEFT = 'cl',
    CENTER_RIGHT = 'cr',
    BOTTOM_LEFT = 'bl',
    BOTTOM_CENTER = 'bc',
    BOTTOM_RIGHT = 'br'
}
