import { ObjectUtil } from 'typescript-util'

/**
 * resizable
 * @author LL
 * @date 2022年04月22日 13点05分
 */
export class ResizableContext {

    public resizableRef: HTMLDivElement
    public controlIsShow: boolean = false

    private dragTarget?: HTMLDivElement
    private dragStart?: { pageX: number, pageY: number }
    private resizableRefStart?: DOMRect

    public controlShow() {
        this.controlIsShow = true
    }

    public controlClose() {
        this.controlIsShow = false
    }

    public controlMouseDown(event: MouseEvent, type: ResizableType) {
        this.dragTarget = event.target as any
        this.dragStart = {pageX: event.pageX, pageY: event.pageY}
        this.resizableRefStart = this.resizableRef.getBoundingClientRect()

        const mouseMove = (event: MouseEvent) => this.mouseMove(event, type)

        // 一次性事件监听: 开始拖动后 任意 mouseup 将导致拖动结束
        const mouseUp = () => {
            if (this.dragTarget) {
                this.dragTarget = undefined
                this.dragStart = undefined
                this.resizableRefStart = undefined
            }
            document.removeEventListener('mouseup', mouseUp)
            document.removeEventListener('mousemove', mouseMove)
        }

        document.addEventListener('mouseup', mouseUp, {passive: false})
        document.addEventListener('mousemove', mouseMove, {passive: false})
    }

    private mouseMove(event: MouseEvent, type: ResizableType) {
        if (!this.dragTarget) {
            return
        }
        if (!this.resizableRefStart || !this.dragStart) {
            console.error('意料之外: resizableRefStart  dragStart  未初始化')
            return
        }

        // 当前鼠标位置
        const {pageX: x, pageY: y} = event
        // 按下鼠标时, 盒子的宽高
        const {width, height, left, top} = this.resizableRefStart
        // 按下鼠标时的起点位置
        const {pageX: oldX, pageY: oldY} = this.dragStart

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
        this.renderStyle(this.resizableRef, rect)
    }

    private renderStyle(el: HTMLDivElement, rect: Partial<DOMRect>) {
        ObjectUtil.forEach(rect as any, (key, value) => el.style[key] = value + 'px')
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
