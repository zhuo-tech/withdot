import { ObjectUtil } from 'typescript-util'
import { Ref, ref } from 'vue'

export type ResType = {
    isShow: Ref<boolean>
    show: () => void
    close: () => void
    start: (event: MouseEvent, type: ResizableType) => void
}

type ChangeValueType = { w: number; h: number; leftValue: number; topValue: number }
type ChangeRectType = Pick<DOMRect, 'width' | 'height' | 'left' | 'top'>

const CONFIG = {
    WIDTH_MIN: 50,
    HEIGHT_MIN: 50,
}

/**
 * useResizableContainer
 * @author LL
 * @date 2022-04-24 上午 12:39
 **/
export function useResizable(element: Ref<HTMLDivElement>, boxRect: () => DOMRect): ResType {
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

    const start = (event: MouseEvent, type: ResizableType) => {
        dragTarget = event.target as any
        dragStart = {pageX: event.pageX, pageY: event.pageY}
        resizableStart = element.value.getBoundingClientRect()

        const move = buildMove(dragTarget, resizableStart, dragStart, type, boxRect, element)

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

        document.addEventListener('mouseup', mouseUp, {passive: true})
        document.addEventListener('mousemove', move, {passive: true})
    }

    return {
        isShow,
        close,
        start,
        show() {
            isShow.value = true
        },
    }
}

function buildMove(
    dragTarget: HTMLDivElement | null,
    resizableStart: DOMRect | null,
    dragStart: { pageX: number; pageY: number } | null,
    type: ResizableType,
    boxRect: () => DOMRect,
    element: Ref<HTMLDivElement>,
) {
    return (event: MouseEvent) => {
        if (!dragTarget) {
            return
        }
        if (!resizableStart || !dragStart) {
            console.error('意料之外: resizableRefStart  dragStart  未初始化')
            return
        }

        // 当前鼠标位置
        const {pageX: x, pageY: y} = event
        // 按下鼠标时的起点位置
        const {pageX: oldX, pageY: oldY} = dragStart
        // 按下鼠标时, 盒子的宽高
        const {width, height, left, top} = resizableStart

        // 鼠标坐标变化值: 正数表示向右下移动, 负数表示左上.
        const change: ChangeValueType = {
            w: x - oldX,
            h: y - oldY,
            leftValue: 0,
            topValue: 0,
        }
        resizableTypeHandle(type, change)

        const {top: boxTop, left: boxLeft} = boxRect()
        let rect: ChangeRectType = {
            width: width + change.w,
            height: height + change.h,
            left: left + change.leftValue - boxLeft,
            top: top + change.topValue - boxTop,
        }
        rect = criticalHandle(rect, element.value.getBoundingClientRect(), boxRect)
        ObjectUtil.forEach(rect as any, (key, value) => element.value.style[key] = value + 'px')
    }
}

/**
 * 边界处理
 * @param {ChangeRectType} rect
 * @param {DOMRect} oldRect
 * @param {() => DOMRect} boxRect
 * @return {{top: number, left: number, width: number, height: number}}
 */
function criticalHandle(rect: ChangeRectType, oldRect: DOMRect, boxRect: () => DOMRect) {
    let {width, height, left, top} = rect
    const {width: pw, height: ph, left: pl, top: pt} = boxRect()

    // width height 最小值越界修正
    if (left < 0) {
        width = width + left
    }
    if (top < 0) {
        height = height + top
    }

    const wv = Math.min(Math.max(width, CONFIG.WIDTH_MIN), pw)
    const hv = Math.min(Math.max(height, CONFIG.HEIGHT_MIN), ph)

    // left top 最小值越界修正
    if (wv === oldRect.width) {
        left = oldRect.left - pl
    }
    if (hv === oldRect.height) {
        top = oldRect.top - pt
    }

    return {
        width: wv,
        height: hv,
        left: Math.min(Math.max(left, 0), pw - width),
        top: Math.min(Math.max(top, 0), ph - height),
    }
}

function resizableTypeHandle(type: ResizableType, change: ChangeValueType) {
    // 鼠标坐标变化值 应如何改变盒子大小
    switch (type) {
        // 四角: 改变宽高
        case ResizableType.TOP_LEFT: {
            const {w, h} = change
            change.w = -w
            change.h = -h
            change.leftValue = w
            change.topValue = h
            break
        }
        case ResizableType.TOP_RIGHT: {
            const {h} = change
            change.h = -h
            change.topValue = h
            break
        }
        case ResizableType.BOTTOM_LEFT: {
            const {w} = change
            change.w = -w
            change.leftValue = w
            break
        }
        case ResizableType.BOTTOM_RIGHT:
            // 无事发生
            break
        // 上下边框: 改变高度
        case ResizableType.TOP_CENTER: {
            change.w = 0
            const {h} = change
            change.h = -h
            change.topValue = h
            break
        }
        case ResizableType.BOTTOM_CENTER: {
            change.w = 0
            break
        }
        // 左右边框: 改变宽度
        case ResizableType.CENTER_LEFT: {
            change.h = 0
            const {w} = change
            change.w = -w
            change.leftValue = w
            break
        }
        case ResizableType.CENTER_RIGHT: {
            change.h = 0
            break
        }
        default:
            throw new Error('ResizableType Error')
    }
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
