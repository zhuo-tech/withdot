import { CoreDot, DotDisplayType } from '@/model/entity/CoreDot'

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
    public divRef: HTMLDivElement
    public rightMenuRef: HTMLDivElement
    private _expectToExpand: boolean
    private readonly props: PropsType

    constructor(props: PropsType) {
        this.props = props
        this._expectToExpand = props.item.display === DotDisplayType.EXPANDED
    }

    public showDetail() {
        this._expectToExpand = true
    }

    public showLabel() {
        this._expectToExpand = false
    }

    public get expectToExpand(): boolean {
        return this._expectToExpand
    }

}
