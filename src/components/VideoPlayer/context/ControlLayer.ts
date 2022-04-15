import { TimeUnit } from 'typescript-util'

/**
 * 控制层显隐控制器
 */
export class ControlLayer {
    private static readonly CONTROL_LAYER_HIDE_DELAY = 2

    public isShow: boolean
    /**
     * 当鼠标悬停于控制层操作按钮上时, 阻止关闭
     */
    public preventClosing: boolean = false

    private timeoutTimer: any

    public show() {
        this.clearTimeout()
        this.isShow = true
        this.timeoutTimer = TimeUnit.SECOND.setTimeout(() => this.close(), ControlLayer.CONTROL_LAYER_HIDE_DELAY)
    }

    public close() {
        if (this.preventClosing) {
            return
        }
        this.isShow = false
    }

    private clearTimeout() {
        if (this.timeoutTimer) {
            clearTimeout(this.timeoutTimer)
        }
    }
}
