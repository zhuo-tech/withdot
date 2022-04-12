import { MouseButtonKeyType, MouseEventTool } from '@/components/VideoPlayer/service/MouseEventTool'
import { getLogger } from '@/main'
import { CoreDot, DotDisplayType } from '@/model/entity/CoreDot'
import { ObjectUtil } from 'typescript-util'
import { PlayerResizeEvent } from '../service/PlayerResizeEvent'

export type PropsType = {
    item: CoreDot
    index: number
}

/**
 * DraggableContext
 * @author LL
 * @date 2022-04-10 上午 3:34
 **/
export class DraggableContext {
    private static readonly ADSORPTION_Z_INDEX = 20000
    private static readonly Z_INDEX_MAX = 100
    private static readonly Z_INDEX_MIN = 0
    private static readonly Z_INDEX_DEFAULT = 1

    private log = getLogger(DraggableContext.name)
    public divRef: HTMLDivElement
    public rightMenuRef: HTMLDivElement
    private _expectToExpand: boolean
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
    private zIndex = DraggableContext.Z_INDEX_DEFAULT
    /**
     * 父容器大小发生变化时, 重设定位
     */
    public resizeRelocate = (event: PlayerResizeEvent) => {
        this.pw = event.width
        this.ph = event.height
        this.setStyle()
    }
    private readonly props: PropsType

    constructor(props: PropsType) {
        this.props = props
        this._expectToExpand = props.item.display === DotDisplayType.EXPANDED
        this.zIndex = props.index
    }

    /**
     * 取消吸附
     */
    public closeAdsorption() {
        this.adsorption = false
        // 更新临时zIndex
        this.setStyle()
    }

    public showDetail() {
        this._expectToExpand = true
    }

    public showLabel() {
        this._expectToExpand = false
    }

    public rightMenuClose() {
        this.rightClickMenuIsShow = false
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

        this.setStyle()
        this.synchronousPropsPosition()
    }

    /**
     * 鼠标按下事件监听
     */
    public onMouseDown(event: MouseEvent) {
        if (MouseEventTool.keyType(event) === MouseButtonKeyType.RIGHT) {
            return
        }

        this.adsorption = true
        // 点击位置
        const {x, y} = event
        const {offsetTop, offsetLeft} = this.divRef
        this.px = x - offsetLeft
        this.py = y - offsetTop
        // 更新临时zIndex
        this.setStyle()
    }

    public rightMenuShow(event: MouseEvent) {
        const {offsetX, offsetY} = event
        this.rightMenuRef.style.top = offsetY - 20 + 'px'
        this.rightMenuRef.style.left = offsetX - 20 + 'px'
        this.rightClickMenuIsShow = true
    }

    public rightMenuOnClick(action: '+1' | '-1' | 'max' | 'min') {
        switch (action) {
            case '+1':
                this.zIndex = Math.min(this.zIndex + 1, DraggableContext.Z_INDEX_MAX)
                break
            case '-1':
                this.zIndex = Math.max(this.zIndex - 1, DraggableContext.Z_INDEX_MIN)
                break
            case 'max':
                this.zIndex = DraggableContext.Z_INDEX_MAX
                break
            case 'min':
                this.zIndex = DraggableContext.Z_INDEX_MIN
                break
            default:
                this.log.trace('不支持的操作类型: ', action)
        }
        this.rightMenuClose()
        this.setStyle()
        this.synchronousPropsPosition()
    }

    private setStyle() {
        const {scaleX, scaleY, pw, ph, zIndex, adsorption} = this
        const top = scaleY * ph
        const left = scaleX * pw

        const {style} = this.divRef
        style.top = top + 'px'
        style.left = left + 'px'
        style.zIndex = String(adsorption ? DraggableContext.ADSORPTION_Z_INDEX : zIndex)
    }

    private synchronousPropsPosition() {
        const {item} = this.props
        if (ObjectUtil.isNull(item.position)) {
            item.position = {} as any
        }
        // @ts-ignore
        item.position.x = this.scaleX
        // @ts-ignore
        item.position.y = this.scaleY
        // @ts-ignore
        item.position.z = this.zIndex
    }

    public get expectToExpand(): boolean {
        return this._expectToExpand
    }

}
