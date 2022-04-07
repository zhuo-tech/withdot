import { getLogger } from '@/main'

/**
 * DivWrapper
 * @author LL
 * @date 2022-04-07 下午 11:08
 **/
export class DivWrapper {
    private log = getLogger(DivWrapper.name)
    private _element: HTMLDivElement

    public get element(): HTMLDivElement {
        if (!this._element) {
            throw new Error('Element 未初始化')
        }
        return this._element
    }

    public setElement(value: HTMLDivElement) {
        this._element = value
    }

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

    public getFocus() {
        this.element.focus({preventScroll: false})
    }
}
