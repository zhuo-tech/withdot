import { CoreDot } from '@/model/entity/CoreDot'
import { Throttling } from '@/tool/annotation/Decorator'
import { ObjectUtil } from 'typescript-util'
import { reactive, watch } from 'vue'

type PropsType = {
    list: Array<CoreDot>,
    box: {
        width: number,
        height: number,
    }
}

type RightMenuAction = '+1' | '-1' | 'max' | 'min'

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

    public styleMap: Record<number, Partial<CSSStyleDeclaration>> = reactive({})

    constructor(props: Readonly<PropsType>) {
        this.props = props

        watch(() => props.list, () => this.bulkUpdateStyles(), {deep: true, immediate: true})
        watch(() => props.box, () => this.bulkUpdateStyles(), {deep: true})
    }

    private bulkUpdateStyles() {
        this.props.list.forEach((item, index) => {
            if (ObjectUtil.isEmpty(item.position)) {
                this.setPosition(index, EditorStageLayerContext.POSITION_DEFAULT)
            }
            this.styleMap[index] = this.updateStyle(index)
        })
    }

    private updateStyle(index: number): Partial<CSSStyleDeclaration> {
        // noinspection JSUnusedLocalSymbols
        const {x, y, z, width, height} = this.props.list[index].position
        const {width: pw, height: ph} = this.props.box

        let zi = this.selectIndex === index
            ? EditorStageLayerContext.ADSORPTION_Z_INDEX
            : z ?? EditorStageLayerContext.Z_INDEX_DEFAULT

        return {
            top: y * ph + 'px',
            left: x * pw + 'px',
            zIndex: String(zi)
        }
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

        // 设置 XY
        const y = clientY - top - soy
        const x = clientX - left - sox

        this.setPosition(index, {x: x / width, y: y / height})
    }

    public setZIndex(action: RightMenuAction, index: number) {
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
        this.setPosition(index, {z: value})
    }

    private setPosition(index: number, style: Partial<CoreDot['position']>) {
        let dot = this.props.list[index]
        if (ObjectUtil.isNull(dot.position)) {
            dot.position = {} as any
        }
        dot.position = {...dot.position, ...style}
    }

}
