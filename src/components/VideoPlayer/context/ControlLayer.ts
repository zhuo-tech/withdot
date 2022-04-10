import { TimeUnit } from 'typescript-util'
import { DraggableLeaveEvent } from '../service/DraggableLeaveEvent'

/**
 * 控制层显隐控制器
 */
export class ControlLayer {
    private static readonly CONTROL_LAYER_HIDE_DELAY = 2

    public isShow: boolean
    /**
     * 当鼠标处悬停于控制层操作按钮上时, 阻止关闭
     */
    public preventClosing: boolean = false

    /**
     * 抑制时间
     * 在此时间戳之后一段时间内, {@link show} 保持静默
     */
    public suppressionLastMinute = 0

    private timeoutTimer: any

    public show() {
        // 没有悬停在控制按钮区域, 并且 处于抑制时间内, 阻止显示
        if (!this.preventClosing && Date.now() < this.suppressionLastMinute + DraggableLeaveEvent.INHIBIT_TIME) {
            return
        }
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
