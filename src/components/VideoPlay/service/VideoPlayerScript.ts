import { VideoWrapper } from '@/components/VideoPlay/service/VideoWrapper'
import { getLogger } from '@/main'
import { ComponentPublicInstance } from '@vue/runtime-core'
import { TimeUnit } from 'typescript-util'
import { reactive } from 'vue'

/**
 * VideoPlayerScript
 * @author LL
 * @date 2022-04-04 下午 11:25
 **/
export class VideoPlayerScript {
    /**
     * 强制刷新时间间隔 单位 毫秒 <br>
     * 进度数据在 DOM 对象中, 播放时的更改无法响应式变更
     */
    private static readonly FORCE_REFRESH_TIME = 200
    /**
     * 控制层鼠标离开隐藏的延迟时间
     */
    private static readonly CONTROL_LAYER_HIDE_DELAY = 2

    private log = getLogger(VideoPlayerScript.name)
    /**
     * 当前组件实例
     */
    private _this: ComponentPublicInstance
    public videoElement: VideoWrapper = new VideoWrapper()
    /**
     * 最外层的容器, 全屏时的目标对象
     * @type {HTMLDivElement}
     */
    private playerBoxElement: HTMLDivElement
    /**
     * 强制刷新定时器
     */
    private forceRefreshTimer: any
    /**
     * 播放状态强制更新key
     */
    public playStatusKey: number = 0

    /**
     * "控制按钮层" 是否显示
     */
    public controlLayer = {
        isShow: false,
        /**
         * @private
         */
        timeoutTimer: null,
        show() {
            this.clearTimeout()
            this.isShow = true
        },
        close() {
            // @ts-ignore
            this.timeoutTimer = TimeUnit.SECOND.setTimeout(() => this.isShow = false, VideoPlayerScript.CONTROL_LAYER_HIDE_DELAY)
        },
        clearTimeout() {
            if (this.timeoutTimer) {
                clearTimeout(this.timeoutTimer)
            }
        },
    }

    constructor(_this: ComponentPublicInstance) {
        this._this = _this
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
        max: 0,
        min: 0,
    })

    private startForceRefresh() {
        // @ts-ignore
        this.forceRefreshTimer = setInterval(() => {
            this._this.$forceUpdate()
        }, VideoPlayerScript.FORCE_REFRESH_TIME)
    }

    private endForceRefresh() {
        clearInterval(this.forceRefreshTimer)
    }

    /**
     * 切换到全屏模式
     */
    public toggleFullScreen() {
        this.playerBoxElement.requestFullscreen({navigationUI: 'show'})
            .then(() => this.log.debug('切换到全屏'))
            .catch((err) => this.log.warn('切换到全屏失败', err))
    }

    /**
     * 初始化进度条长度
     */
    public initProgressMax() {
        const max = this.videoElement.videoDuration
        this.progress.max = isNaN(max) ? 0 : max
    }

    /**
     * 切换播放状态
     */
    public togglePlaybackState() {
        const {paused} = this.videoElement
        if (paused) {
            this.videoElement.play()
            this.startForceRefresh()
        } else {
            this.videoElement.pause()
            this.endForceRefresh()
        }
        this.playStatusKey++
    }

}
