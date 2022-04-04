import { VideoWrapper } from '@/components/VideoPlay/service/VideoWrapper'
import { getLogger } from '@/main'
import { reactive, Ref, ref } from 'vue'

/**
 * VideoPlayerScript
 * @author LL
 * @date 2022-04-04 下午 11:25
 **/
export class VideoPlayerScript {
    private log = getLogger(VideoPlayerScript.name)
    // @ts-ignore
    public videoElement: VideoWrapper = reactive(new VideoWrapper())
    public progress = reactive({
        videoElement: this.videoElement,
        get value(): number {
            return this.videoElement.currentTime ?? 0
        },
        set value(value) {
            this.videoElement.currentTime = value
        },
        max: 0,
        min: 0,
    })
    /**
     * 最外层的容器, 全屏时的目标对象
     * @type {HTMLDivElement}
     */
    private playerBoxElement: HTMLDivElement

    public setPlayerBox = (element: HTMLDivElement) => {
        this.playerBoxElement = element
    }

    public toggleFullScreen() {
        this.playerBoxElement.requestFullscreen({navigationUI: 'show'})
            .then(() => this.log.debug('切换到全屏'))
            .catch((err) => this.log.warn('切换到全屏失败', err))
    }

}
