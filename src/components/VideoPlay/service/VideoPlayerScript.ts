import { VideoWrapper } from '@/components/VideoPlay/service/VideoWrapper'
import { getLogger } from '@/main'
import { TimeUnit } from 'typescript-util'
import { reactive } from 'vue'

/**
 * VideoPlayerScript
 * @author LL
 * @date 2022-04-04 下午 11:25
 **/
export class VideoPlayerScript {
    private log = getLogger(VideoPlayerScript.name)
    public videoElement: VideoWrapper = new VideoWrapper()
    /**
     * 最外层的容器, 全屏时的目标对象
     * @type {HTMLDivElement}
     */
    private playerBoxElement: HTMLDivElement
    /**
     * 播放状态强制更新key
     */
    public playStatusKey: number = 0
    /**
     * "控制按钮层" 是否显示
     */
    public controlLayer = new ControlLayer()

    constructor() {
        // 初始化视频最大时长
        this.videoElement.pushReadyCallback(() => {
            const max = this.videoElement.videoDuration
            this.progress.max = isNaN(max) ? 0 : max
        })
    }

    public setPlayerBox = (element: HTMLDivElement) => {
        this.playerBoxElement = element
    }

    public progress = reactive({
        log: this.log,
        videoElement: this.videoElement,
        get value() {
            return this.videoElement.currentTime
        },
        set value(value) {
            this.videoElement.currentTime = value
        },
        max: 200,
        min: 0,
    })

    /**
     * 切换到全屏模式
     */
    public toggleFullScreen = () => {
        this.playerBoxElement.requestFullscreen({navigationUI: 'show'})
            .then(() => this.log.debug('切换到全屏'))
            .catch((err) => this.log.warn('切换到全屏失败', err))
    }

    /**
     * 切换播放状态
     */
    public togglePlaybackState = () => {
        this.videoElement.togglePlayState()
        this.playStatusKey++
    }

}

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
