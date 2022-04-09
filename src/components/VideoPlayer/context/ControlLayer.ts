import { TimeUnit } from 'typescript-util'

/**
 * 控制层显隐控制器
 */
export class ControlLayer {
    /**
     * 控制层鼠标离开隐藏的延迟时间
     */
    private static readonly CONTROL_LAYER_HIDE_DELAY = 2

    public isShow: boolean
    private timeoutTimer: null

    public show() {
        this.clearTimeout()
        this.isShow = true
    }

    public close() {
        this.clearTimeout()
        // @ts-ignore
        this.timeoutTimer = TimeUnit.SECOND.setTimeout(() => this.isShow = false, ControlLayer.CONTROL_LAYER_HIDE_DELAY)
    }

    private clearTimeout() {
        if (this.timeoutTimer) {
            clearTimeout(this.timeoutTimer)
        }
    }
}
