import { getLogger } from '@/main'
import { MouseButtonKeyType, MouseEventTool } from '../service/MouseEventTool'
import { PlayerResizeEvent } from '../service/PlayerResizeEvent'

/**
 * DraggableContext
 * @author LL
 * @date 2022-04-10 上午 3:34
 **/
export class DraggableContext {
    private log = getLogger(DraggableContext.name)
    public divRef: HTMLDivElement
    public rightMenuRef: HTMLDivElement

    /**
     * 拖动吸附
     */
    private adsorption = false
    /**
     * 右键菜单显示
     */
    public rightClickMenuIsShow = false
    // 父级盒子 坐标
    private pw = 0
    private ph = 0
    private px = 0
    private py = 0

    // 百分比定位
    private scaleX = 0.5
    private scaleY = 0.5

    /**
     * 取消吸附
     */
    public closeAdsorption() {
        this.adsorption = false
    }

    /**
     * 拖动时设置定位
     */
    public dragReLocate(event: MouseEvent) {
        if (!this.adsorption) {
            return
        }
        const {x, y} = event
        const {px, py, pw, ph} = this

        const top = Math.max(Math.min(y - py, ph), 0)
        const left = Math.max(Math.min(x - px, pw), 0)

        // 重设百分比
        this.scaleX = left / pw
        this.scaleY = top / ph

        DraggableContext.setLocation(this.divRef, top, left)
    }

    /**
     * 父容器大小发生变化时, 重设定位
     */
    public resizeRelocate = (event: PlayerResizeEvent) => {
        const {width, height} = event

        this.pw = width
        this.ph = height

        // 使用新的容器大小计算相对位置
        const {scaleX, scaleY} = this
        const left = width * scaleX
        const top = height * scaleY
        DraggableContext.setLocation(this.divRef, top, left)

        if (this.log.isTraceEnable()) {
            this.log.trace('重新计算位置 父盒子: ', {width, height}, '相对位置: ', {scaleX, scaleY}, '定位: ', {top, left})
        }
    }

    /**
     * 鼠标按下事件监听
     * @param {MouseEvent} event
     */
    public onMouseDown(event: MouseEvent) {
        switch (MouseEventTool.keyType(event)) {
            // 左键点击: 标记吸附, 初始化父级容器参照点
            case MouseButtonKeyType.LEFT: {
                this.adsorption = true
                // 点击位置
                const {x, y} = event
                const {offsetTop, offsetLeft} = this.divRef
                this.px = x - offsetLeft
                this.py = y - offsetTop

                break
            }
            // 右键点击: 显示右键菜单
            case MouseButtonKeyType.RIGHT: {
                const {offsetX, offsetY} = event
                DraggableContext.setLocation(this.rightMenuRef, offsetY, offsetX)
                this.rightClickMenuIsShow = true
                break
            }
            default:
        }
        return false
    }

    private static setLocation(dom: HTMLDivElement, top: number, left: number) {
        dom.style.top = top + 'px'
        dom.style.left = left + 'px'
    }

}
