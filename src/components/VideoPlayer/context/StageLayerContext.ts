import { CoreDot } from '@/model/entity/CoreDot'

/**
 *
 * @author LL
 * @date 2022年04月13日 19点22分
 */
export class StageLayerContext {

    public stageLayerRef: HTMLDivElement

    private dotList: Array<CoreDot> = []

    private selectIndex: number | null

    private pTop: number = 0
    private pLeft: number = 0

    public updateReferencePoint() {
        const {offsetTop: top, offsetLeft: left} = this.stageLayerRef
        this.pTop = top
        this.pLeft = left
    }

    public onMouseDown(event: MouseEvent, index: number) {
        this.selectIndex = null
    }

    public onMouseUp(event: MouseEvent, index: number) {
        this.selectIndex = index
    }

    public onMouseMove(event: MouseEvent) {
        if (!this.selectIndex) {
            return
        }
        const {clientX, clientY, offsetX, offsetY} = event

        let dot: CoreDot = this.dotList[this.selectIndex]
        if (!dot.position) {
            dot.position = {} as any
        }
        const pWidth = 2
        const pHeight = 2
        // @ts-ignore
        dot.position.x = (clientX - offsetX - this.pLeft) / pWidth
        // @ts-ignore
        dot.position.y = (clientY - offsetY - this.pTop) / pHeight
    }

}
