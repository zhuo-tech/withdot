import { VideoWrapper } from '@/components/VideoPlay/service/VideoWrapper'
import { getLogger } from '@/main'
import { ComponentPublicInstance } from '@vue/runtime-core'
import { reactive } from 'vue'

/**
 * VideoPlayerScript
 * @author LL
 * @date 2022-04-04 下午 11:25
 **/
export class VideoPlayerScript {
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

    constructor(_this: ComponentPublicInstance) {
        this._this = _this
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
        }, 200)
    }

    private endForceRefresh() {
        clearInterval(this.forceRefreshTimer)
    }

    public setPlayerBox = (element: HTMLDivElement) => {
        this.playerBoxElement = element
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
