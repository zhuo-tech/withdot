import { getLogger } from '@/main'
import { MouseButtonKeyType, MouseEventTool } from '@/tool/MouseEventTool'
import { ObjectUtil } from 'typescript-util'
import { reactive, readonly, Ref, ref } from 'vue'

type ChangeValueType = { w: number; h: number; leftValue: number; topValue: number }
type ChangeRectType = Pick<DOMRect, 'width' | 'height' | 'left' | 'top'>
type Location = Pick<MouseEvent, 'pageX' | 'pageY'>

export type ResizableLocation = {
    width: number
    height: number
    left: number
    top: number
}

export type ResizableReturn = {
    /**
     * 是否显示控制按钮和虚线边框
     */
    isShowResizable: Ref<boolean>
    enableDraggable: Ref<boolean>
    /**
     * 定位信息
     */
    location: ResizableLocation
    /**
     * 显示控制按钮
     */
    showResizable(): void
    /**
     * 隐藏控制按钮
     */
    closeResizable(): void
    /**
     * resizable
     */
    startResizable(event: MouseEvent, type: ResizableType): void
    /**
     * 开始拖动
     */
    startDraggable(event: MouseEvent): void
    /**
     * 重设定位信息 (操作DOM)
     */
    reset(newLocation?: ResizableLocation): void
}

const CONFIG = {
    // 拉伸时 宽高最小值
    WIDTH_MIN: 50,
    HEIGHT_MIN: 50,
    // 开始拖动时的临时 zIndex
    TEMP_Z_INDEX: '1000',
}

const log = getLogger('useResizable')

/**
 * useResizable
 * @author LL
 * @date 2022-04-24 上午 12:39
 * @param {Ref<HTMLDivElement>} element 目标元素
 * @param {() => DOMRect} boxRect 目标元素的意向父容器大小
 * @param {Partial<ResizableLocation>} initValue 初始化值
 * @param {() => void} onChange 发生变化后的回调
 * @return {ResizableReturn} 控制属性
 **/
export function useResizable(element: Ref<HTMLDivElement>, boxRect: () => DOMRect, initValue?: Partial<ResizableLocation>, onChange?: () => void): ResizableReturn {
    const isShowResizable = ref(false)
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

    // 拖动相关
    const enableDraggable = ref(false)
    let oldZIndex = '0'
    let startRect: DOMRect
    let start: Location

    const showResizable = () => {
        isShowResizable.value = true
    }
    const closeResizable = () => {
        if (isShowResizable.value) {
            isShowResizable.value = false
            log.trace('关闭 Resizable')
        }
    }
    const startResizable = (event: MouseEvent, type: ResizableType) => {
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
            document.removeEventListener('mouseup', mouseUp, true)
            document.removeEventListener('mousemove', move, true)
            log.trace('暂停 Resizable move 移除')
        }

        document.addEventListener('mouseup', mouseUp, true)
        document.addEventListener('mousemove', move, true)
        log.trace('开始 Resizable')
    }

    // 拖动 move
    const draggableMouseMove = (event: MouseEvent) => {
        if (!enableDraggable.value) {
            return
        }
        log.trace('拖动 move', enableDraggable.value)

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

        element.value.style.left = end.left + 'px'
        element.value.style.top = end.top + 'px'

        onChange?.()
    }
    const startDraggable = (event: MouseEvent) => {
        if (MouseEventTool.keyType(event) === MouseButtonKeyType.RIGHT) {
            log.debug('draggable start: 丢弃 右键点击')
            return
        }
        if (enableDraggable.value) {
            log.warn(' start draggable: 已经启用 或 未注销, 丢弃')
            return
        }

        enableDraggable.value = true
        startRect = element.value.getBoundingClientRect()
        start = event

        oldZIndex = element.value.style.zIndex
        element.value.style.zIndex = CONFIG.TEMP_Z_INDEX

        document.addEventListener('mousemove', draggableMouseMove, true)
        document.addEventListener('mouseup', stopDraggable, true)

        log.trace('开始拖动 listener move; enableDraggable.value = ', enableDraggable.value)
    }
    const stopDraggable = () => {
        if (enableDraggable.value) {
            log.trace('停止拖动 enableDraggable = ', enableDraggable.value, 'move 移除')
            enableDraggable.value = false
            element.value.style.zIndex = oldZIndex
            document.removeEventListener('mousemove', draggableMouseMove, true)
            document.removeEventListener('mouseup', stopDraggable, true)
        } else {
            log.warn('抛弃 stopDraggable; enableDraggable = ', enableDraggable.value)
        }
    }

    const reset = (newLocation: ResizableLocation = location) => {
        const {width, height, left, top} = newLocation
        const {width: pw, height: ph} = boxRect()
        renderDOM({
            width: Math.max(width * pw, CONFIG.WIDTH_MIN),
            height: Math.max(height * ph, CONFIG.HEIGHT_MIN),
            left: left * pw,
            top: top * ph,
        }, element)
    }

    return {
        isShowResizable: isShowResizable,
        enableDraggable: readonly(enableDraggable),
        location,
        showResizable,
        startResizable,
        closeResizable,
        startDraggable,
        reset,
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
            log.error('意料之外: resizableRefStart  dragStart  未初始化')
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

        onChange?.()

        renderDOM(rect, element)
    }
}

/**
 * 操作 DOM 应用计算后的样式
 */
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

/**
 * 鼠标坐标变化值 应如何改变盒子大小
 * @param {ResizableType} type 拖动缩放方向
 * @param {ChangeValueType} change 变化量
 */
function resizableTypeHandle(type: ResizableType, change: ChangeValueType) {
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

/**
 * 拖动缩放方向
 */
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
