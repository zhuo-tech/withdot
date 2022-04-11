import { DivWrapper } from '../service/DivWrapper'

export type PropsType = {
    value: number
    bufferValue: number
    min: number
    max: number
    formatTips: (value: number) => string
}

/**
 * ProgressBarContext
 * @author LL
 * @date 2022-04-10 下午 10:59
 **/
export class ProgressBarContext {
    /**
     * 轨道 DOM
     */
    public trackRef = new DivWrapper()
    /**
     * TIPS DOM
     */
    public tipsRef = new DivWrapper()
    /**
     * Button 吸附, 处于拖动状态
     */
    public buttonAdsorption = false

    private readonly props: PropsType

    private tipsValue = 0

    private readonly emitValue: (value: number) => void

    constructor(props: PropsType, emitValue: (value: number) => void) {
        this.props = props
        this.emitValue = emitValue
    }

    /**
     * 展示进度百分比
     */
    public get percentage() {
        const {value, max} = this.props
        return (value / max * 100).toFixed(2) + '%'
    }

    /**
     * 展示缓冲百分比
     */
    public get bufferPercentage() {
        const {max, bufferValue} = this.props
        return (bufferValue / max * 100).toFixed(2) + '%'
    }

    /**
     * 显示 TIPS 值
     */
    public get showTipsValue() {
        if (this.props.formatTips) {
            return this.props.formatTips(this.tipsValue)
        }
        return this.tipsValue.toFixed(2)
    }

    /**
     * 轨道单击事件
     */
    public trackOnClick = (event: MouseEvent) => {
        const {offsetX} = event
        const {width} = this.trackRef.realWidthHeight
        this.emitValue(offsetX / width * this.props.max)
    }

    /**
     * 进度按钮 mouse up
     */
    public buttonMouseUp = () => {
        this.buttonAdsorption = false
    }

    /**
     * 进度按钮 mouse down
     */
    public buttonMouseDown = () => {
        this.buttonAdsorption = true
    }

    /**
     * 轨道 mouse move
     */
    public trackMouseMove = (event: MouseEvent) => {
        // 进度条原点
        const {left, width} = this.trackRef.getBoundingClientRect()
        // 移动至坐标
        const {clientX} = event
        const value = (clientX - left) / width * this.props.max

        // 吸附拖动
        if (this.buttonAdsorption) {
            this.emitValue(value)
            return
        }
        // 悬停展示 TIPS
        this.tipsValue = value
        this.tipsRef.style.left = (clientX - left) / width * 100 + '%'
    }
}
