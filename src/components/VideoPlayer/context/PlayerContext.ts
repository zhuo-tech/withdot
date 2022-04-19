import { useResizeMonitor } from '@/tool/hooks/useResizeMonitor'
import { reactive } from 'vue'
import { VideoWrapperContext } from '../context/VideoWrapperContext'
import { ControlModel } from '../service/ControlModel'
import { DivWrapper } from '../service/DivWrapper'

/**
 * 播放器上下文
 * @author LL
 * @date 2022-04-04 下午 11:25
 **/
export class PlayerContext {
    private readonly props: Readonly<any>
    /**
     * 最外层的容器 DOM 引用, 全屏时的目标对象
     * @type {HTMLDivElement}
     */
    public playerBoxElement: DivWrapper = new DivWrapper()
    public boxWidthHeight = reactive({
        height: 0,
        width: 0,
    })
    private resize = () => {
        const {width, height} = this.props.aspectRatio
        this.playerBoxElement.resizeHeight(width, height)

        const {width: w, height: h} = this.playerBoxElement.realWidthHeight
        this.boxWidthHeight.height = h
        this.boxWidthHeight.width = w
    }

    constructor(props: any) {
        this.props = props
        useResizeMonitor(this.resize, () => this.playerBoxElement.element)
    }
}

export class ControlModelAdapter implements ControlModel {

    private readonly videoContext: VideoWrapperContext
    private readonly videoBoxElement: DivWrapper
    public setPlayTime: (time: number) => void = (time) => {
        this.videoContext.setPlayTime(time)
    }
    public play: () => void = () => {
        this.videoContext.play()
    }
    public pause: () => void = () => {
        this.videoContext.pause()
    }
    public toggleFullScreen: () => void = () => {
        this.videoBoxElement.toggleFullScreen()
    }

    public togglePlaybackStatus(): void {
        this.playing ? this.pause() : this.play()
    }

    constructor(videoContext: VideoWrapperContext, videoBoxElement: DivWrapper) {
        this.videoContext = videoContext
        this.videoBoxElement = videoBoxElement
    }

    public get minTime(): number {
        return 0
    }

    public get time(): number {
        return this.videoContext.playTime
    }

    public get bufferTime(): number {
        return this.videoContext.bufferTime
    }

    public get maxTime(): number {
        return this.videoContext.maxDuration
    }

    public get playing(): boolean {
        return this.videoContext.playing
    }

    public get playbackRate(): number {
        return this.videoContext.playbackRate
    }

    public set playbackRate(value: number) {
        this.videoContext.playbackRate = value
    }

    public get volume(): number {
        return this.videoContext.volume
    }

    public set volume(value: number) {
        this.videoContext.volume = value
    }
}
