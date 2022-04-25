import { VideoWrapperContext } from '@/components/VideoPlayer/context/VideoWrapperContext'
import { ControlModel } from '@/components/VideoPlayer/service/ControlModel'
import { Throttling } from '@/tool/annotation/Decorator'

export class ControlModelAdapter implements ControlModel {

    private readonly videoContext: VideoWrapperContext

    constructor(videoContext: VideoWrapperContext) {
        this.videoContext = videoContext
    }

    @Throttling(50)
    public setPlayTime(time: number) {
        console.debug('设置播放时间')
        this.videoContext.setPlayTime(time)
    }

    public play() {
        this.videoContext.play()
    }

    public pause() {
        this.videoContext.pause()
    }

    public togglePlaybackStatus(): void {
        this.playing ? this.pause() : this.play()
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
