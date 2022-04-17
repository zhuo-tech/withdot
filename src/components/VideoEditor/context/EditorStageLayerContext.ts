import { CoreDot } from '@/model/entity/CoreDot'
import { Throttling } from '@/tool/annotation/Decorator'
import { ObjectUtil, StrUtil } from 'typescript-util'
import { reactive, watch } from 'vue'

type PropsType = {
    list: Array<CoreDot>,
    box: {
        width: number,
        height: number,
    }
}

/**
 *
 * @author LL
 * @date 2022年04月13日 19点22分
 */
export class EditorStageLayerContext {
    private static readonly ADSORPTION_Z_INDEX = 20000
    private static readonly Z_INDEX_MAX = 100
    private static readonly Z_INDEX_MIN = 0
    private static readonly Z_INDEX_DEFAULT = 1

    private static readonly POSITION_DEFAULT: CoreDot['position'] = {
        x: 0.5,
        y: 0.5,
        z: 1,
    }
    private readonly props: Readonly<PropsType>
    public stageLayerRef: HTMLDivElement
    private selectIndex: number | null
    private selectOffsetX = 0
    private selectOffsetY = 0
    private pTop: number = 0
    private pLeft: number = 0
    private indexStyleMapping: Record<number, CSSStyleDeclaration> = reactive({})

    constructor(props: Readonly<PropsType>) {
        this.props = props

        this.props.list.forEach((item, index) => {
            if (ObjectUtil.isEmpty(item.position)) {
                this.setPosition(index, EditorStageLayerContext.POSITION_DEFAULT)
            }
        })

        watch(() => props.box, () => {
            this.onResize()
        }, {
            deep: true,
        })
    }

    public getStyle(index: number) {
        const style = this.indexStyleMapping[index]
        if (ObjectUtil.isEmpty(style)) {
            return StrUtil.EMPTY
        }

        let zi = this.selectIndex === index
            ? EditorStageLayerContext.ADSORPTION_Z_INDEX
            : style.zIndex ?? EditorStageLayerContext.Z_INDEX_DEFAULT

        return `top: ${ style.top }; left: ${ style.left }; zIndex: ${ zi }`
    }

    public updateReferencePoint() {
        const {offsetTop: top, offsetLeft: left} = this.stageLayerRef
        this.pTop = top
        this.pLeft = left
    }

    public onMouseDown(event: MouseEvent, index: number) {
        this.selectIndex = index
        const {offsetX, offsetY} = event
        this.selectOffsetX = offsetX
        this.selectOffsetY = offsetY

        this.stageLayerRef.style.pointerEvents = 'auto'
    }

    // noinspection JSUnusedLocalSymbols
    public onMouseUp(event: MouseEvent) {
        this.selectIndex = null

        this.stageLayerRef.style.pointerEvents = 'none'
    }

    @Throttling(60)
    public onMouseMove(event: MouseEvent) {
        let index = this.selectIndex

        if (index === null || index === undefined) {
            return
        }

        // props.box 和 stageLayerRef 的宽高实际是相同的
        const {top, left} = this.stageLayerRef.getBoundingClientRect()
        const {width, height} = this.props.box

        const {selectOffsetX: sox, selectOffsetY: soy} = this
        const {clientX, clientY} = event

        const style = this.tryGetStyleMapping(index)

        // 设置 XY
        const y = clientY - top - soy
        const x = clientX - left - sox

        style.top = y + 'px'
        style.left = x + 'px'

        this.setPosition(index, {x: x / width, y: y / height})
    }

    public setZIndex(action: '+1' | '-1' | 'max' | 'min', index: number) {
        const style = this.tryGetStyleMapping(index)

        const position = this.props.list[index].position
        let old = position?.z ?? EditorStageLayerContext.Z_INDEX_DEFAULT

        let value = 0
        switch (action) {
            case '+1':
                value = Math.min(old + 1, EditorStageLayerContext.Z_INDEX_MAX)
                break
            case '-1':
                value = Math.max(old - 1, EditorStageLayerContext.Z_INDEX_MIN)
                break
            case 'max':
                value = EditorStageLayerContext.Z_INDEX_MAX
                break
            case 'min':
                value = EditorStageLayerContext.Z_INDEX_MIN
                break
            default:
        }
        // 设置 Z
        style.zIndex = String(value)
        this.setPosition(index, {z: value})
    }

    /**
     * 容器大小发生变化时, 重设定位样式
     */
    private onResize() {
        const {width, height} = this.props.box

        this.props.list.forEach((dot, index) => {
            if (ObjectUtil.isEmpty(dot.position)) {
                return
            }
            const {x, y} = dot.position

            const style = this.tryGetStyleMapping(index)
            style.top = y * height + 'px'
            style.left = x * width + 'px'
        })
    }

    private setPosition(index: number, style: Partial<CoreDot['position']>) {
        let dot = this.props.list[index]
        if (ObjectUtil.isNull(dot.position)) {
            dot.position = {} as any
        }
        dot.position = {...dot.position, ...style}
    }

    private tryGetStyleMapping(index: number) {
        const style = this.indexStyleMapping[index]
        if (ObjectUtil.isNotEmpty(style)) {
            return style
        }
        this.indexStyleMapping[index] = {} as any
        return this.indexStyleMapping[index]
    }

}
