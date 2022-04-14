import { getLogger } from '@/main'
import { DomWrapper, DomWrapperInitializeError } from '../service/DomWrapper'

/**
 * DivWrapper
 * @author LL
 * @date 2022-04-07 下午 11:08
 **/
export class DivWrapper implements DomWrapper<HTMLDivElement> {

    private log = getLogger(DivWrapper.name)
    private _element: HTMLDivElement
    /**
     * 等待就绪的回调函数
     */
    private readyCallback: Array<() => void> = []

    public get element(): HTMLDivElement {
        if (!this._element) {
            throw new DomWrapperInitializeError('Element 未初始化')
        }
        return this._element
    }

    public setElement(value: HTMLDivElement) {
        if (!value) {
            return
        }
        if (value === this._element) {
            return
        }
        this._element = value
        for (let cb of this.readyCallback) {
            try {
                cb?.()
            } catch (e) {
                this.log.warn('就绪回调执行失败', e)
            }
        }
    }

    public onInitializeFinish(callback: () => void): number {
        if (!callback) {
            return -1
        }
        const length = this.readyCallback.push(callback)
        return length - 1
    }

    /**
     * 切换全屏状态
     */
    public toggleFullScreen = () => {
        const action = async () => {
            this.log.trace('切换全屏状态')
            if (document.fullscreenElement) {
                await document.exitFullscreen()
            } else {
                await this.element.requestFullscreen({navigationUI: 'auto'})
            }
        }
        action()
            .catch((err) => this.log.warn('切换到全屏失败', err))
    }

    /**
     * 获取焦点
     */
    public getFocus() {
        this.element.focus({preventScroll: false})
    }

    public getBoundingClientRect(): DOMRect {
        return this.element.getBoundingClientRect()
    }

    public get realWidthHeight() {
        const {width, height} = this.getBoundingClientRect()
        return {width, height}
    }

    public get style(): CSSStyleDeclaration {
        return this.element.style
    }

    /**
     * 使用给定的宽高比, 以 width 为基准, 重设 元素高度
     * @param {number} width 宽高比
     * @param {number} height 宽高比
     */
    public resizeHeight(width: number, height: number): void {
        const {width: w} = this.realWidthHeight
        this.style.height = w / width * height + 'px'
    }
}
