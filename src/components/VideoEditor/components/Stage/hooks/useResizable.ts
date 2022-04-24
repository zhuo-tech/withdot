import { ObjectUtil } from 'typescript-util'
import { reactive, Ref, ref } from 'vue'

type ChangeValueType = { w: number; h: number; leftValue: number; topValue: number }

type ChangeRectType = Pick<DOMRect, 'width' | 'height' | 'left' | 'top'>

export type ResizableLocation = {
    width: number
    height: number
    left: number
    top: number
    lastTime: number
}

export type ResizableReturn = {
    /**
     * 是否显示控制按钮和虚线边框
     */
    isShow: Ref<boolean>
    /**
     * 定位信息
     */
    location: ResizableLocation
    /**
     * 显示控制按钮
     */
    show(): void
    /**
     * 隐藏控制按钮
     */
    close(): void
    /**
     * resizable
     */
    start(event: MouseEvent, type: ResizableType): void

    /**
     * 重设定位信息 (操作DOM)
     */
    reset(newLocation?: ResizableLocation): void
}

const CONFIG = {
    WIDTH_MIN: 50,
    HEIGHT_MIN: 50,
}

/**
 * useResizableContainer
 * @author LL
 * @date 2022-04-24 上午 12:39
 **/
export function useResizable(element: Ref<HTMLDivElement>, boxRect: () => DOMRect, initValue?: Partial<ResizableLocation>, onChange?: () => void): ResizableReturn {
    const isShow = ref(false)
    const location: ResizableLocation = reactive({
        width: initValue?.width ?? 0,
        height: initValue?.height ?? 0,
        left: initValue?.left ?? 0,
        top: initValue?.top ?? 0,
        lastTime: Date.now(),
    })

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

        const move = buildMove(dragTarget, resizableStart, dragStart, type, boxRect, element, location, onChange)

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
        location,
        close,
        start,
        show() {
            isShow.value = true
        },
        reset(newLocation: ResizableLocation = location) {
            const {width, height, left, top} = newLocation
            const {width: pw, height: ph} = boxRect()
            renderDOM({
                width: Math.max(width * pw, CONFIG.WIDTH_MIN),
                height: Math.max(height * ph, CONFIG.HEIGHT_MIN),
                left: left * pw,
                top: top * ph,
            }, element)
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
    location: ResizableLocation,
    onChange?: () => void,
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

        const {top: boxTop, left: boxLeft, width: pw, height: ph} = boxRect()
        let rect: ChangeRectType = {
            width: width + change.w,
            height: height + change.h,
            left: left + change.leftValue - boxLeft,
            top: top + change.topValue - boxTop,
        }
        // 越界修正
        rect = criticalHandle(rect, element.value.getBoundingClientRect(), boxRect)

        // 应用
        location.width = rect.width / pw
        location.height = rect.height / ph
        location.top = rect.top / ph
        location.left = rect.left / pw
        location.lastTime = Date.now()

        onChange?.()

        renderDOM(rect, element)
    }
}

function renderDOM(rect: ChangeRectType, element: Ref<HTMLDivElement>) {
    ObjectUtil.forEach(rect as any, (key, value) => element.value.style[key] = value + 'px')
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
