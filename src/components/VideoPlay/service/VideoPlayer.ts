import { DivWrapper } from '@/components/VideoPlay/service/DivWrapper'
import { VideoWrapper } from '@/components/VideoPlay/service/VideoWrapper'
import { InjectionKey } from '@vue/runtime-core'

/**
 * VideoPlayerScript
 * @author LL
 * @date 2022-04-04 下午 11:25
 **/
export class VideoPlayer {
    public static readonly INJECTION_KEY: InjectionKey<VideoPlayer> = Symbol.for(VideoPlayer.name)

    public minDuration: number = 0
    /**
     * Video 标签 DOM引用
     */
    public videoElement: VideoWrapper = new VideoWrapper()
    /**
     * 最外层的容器 DOM 引用, 全屏时的目标对象
     * @type {HTMLDivElement}
     */
    public playerBoxElement: DivWrapper = new DivWrapper()

}
