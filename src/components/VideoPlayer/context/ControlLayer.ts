import { TimeUnit } from 'typescript-util'

/**
 * 控制层显隐控制器
 */
export class ControlLayer {
    private static readonly CONTROL_LAYER_HIDE_DELAY = 2

    public isShow: boolean
    private timeoutTimer: any

    public show() {
        this.clearTimeout()
        this.isShow = true
        this.timeoutTimer = TimeUnit.SECOND.setTimeout(() => this.close(), ControlLayer.CONTROL_LAYER_HIDE_DELAY)
    }

    public close() {
        this.isShow = false
    }

    private clearTimeout() {
        if (this.timeoutTimer) {
            clearTimeout(this.timeoutTimer)
        }
    }
}
