import { getLogger } from '@/main'
import { LoggerLevel } from '@/tool/log/LoggerLevel'
import { TimeUnit } from 'typescript-util'
import { computed } from 'vue'

/**
 * 播放器包装
 * 假设播放器是一个 {@link CoreDot}
 * @author LL
 * @date 2022年04月14日 14点21分
 */
export class VideoWrapperContext {
    private log = getLogger(VideoWrapperContext.name, LoggerLevel.DEBUG)
    private videoRef: HTMLVideoElement

    /**
     * 内部维护的播放状态, 与 {@link paused} 区别在于 这个字段应该是响应式的
     */
    public playing: boolean = false
    /**
     * 视频状态: 初始化, 加载, 播放完成等
     * 由 load 相关事件维护
     * @see VideoState
     */
    public status: VideoState = ExtendedState.UNINITIALIZED
    /**
     * 视频时长, 单位 秒;
     */
    public maxDuration = 0
    /**
     * 内部维护的视频当前播放时间, 单位 秒; <br>
     */
    public playTime = 0

    // TODO: ....
    public volume = computed({
        get: () => {
            // console.debug('读取音量', this.videoRef.volume * 100)
            return this.videoRef.volume * 100
        },
        set: (value) => {
            // console.debug('设置音量', value)
            this.videoRef.volume = value / 100
        },
    }, {
        onTrack: (event) => {
            // console.debug('收集', event)
        },
        onTrigger: (event) => {
            // console.debug('触发', event)
        },
    })

    public playbackRate = computed({
        get: () => {
            return this.videoRef.playbackRate
        },
        set: (value) => {
            this.videoRef.playbackRate = value
        },
    })

    public setPlayTime(time: number) {
        this.videoRef.currentTime = time
    }

    /**
     * 暂停
     * @see togglePlayState
     */
    public pause() {
        this.videoRef.pause()
        this.playing = false
        this.log.debug('播放暂停')
    }

    /**
     * 播放
     * @see togglePlayState
     */
    public play() {
        this.videoRef.play()
            .then(() => {
                this.log.debug('开始播放')
                this.playing = true
            })
            .catch((err) => this.log.warn('播放失败', err))
    }

    /**
     * 切换播放状态
     */
    public togglePlayState() {
        this.log.debug('切换播放状态: ', this.playing ? '暂停' : '播放')
        if (this.playing) {
            this.pause()
        } else {
            this.play()
        }
    }

    /**
     * 视频缓冲时间
     */
    public get bufferTime() {
        if (!this.videoRef) {
            return 0
        }
        const buffer: TimeRanges = this.videoRef.buffered
        if (buffer.length <= 0) {
            return 0
        }

        // 只看最后一个 TimeRanges 的结束时间
        return buffer.end(buffer.length - 1)
    }

    public get showEnd() {
        if (this.playing) {
            return false
        }
        return this.status === ExtendedState.PLAY_FINISHED
    }

    public onLoadedData(event: Event) {
        this.status = this.videoRef.readyState
        this.log.trace('加载数据', this.videoRef.readyState, event)

        if (this.videoRef.readyState >= MediaReadyState.HAVE_FUTURE_DATA) {
            this.maxDuration = this.videoRef.duration
        }
    }

    public onTimeUpdate(event: Event) {
        if (this.log.isTraceEnable()) {
            this.log.trace(event.type, '播放时间', TimeUnit.SECOND.display(this.videoRef.currentTime))
        }

        this.status = this.videoRef.readyState
        this.playTime = this.videoRef.currentTime

        // 通知播放完成
        if (this.videoRef.ended) {
            this.status = ExtendedState.PLAY_FINISHED
            this.videoRef.pause()
        }
    }

    // noinspection JSUnusedLocalSymbols
    public onLoadStart(event: Event) {
        // this.log.info('on load start')
    }

    // noinspection JSUnusedLocalSymbols
    public onLoadMetaData(event: Event) {
        this.status = this.videoRef.readyState
        // this.log.debug('load meta data')
    }

}

/**
 * 就绪状态
 * | Constant   | Value   | Description |
 * | ---------------| -------- | ----------------------------------|
 * | HAVE_NOTHING   | 0  |  没有关于音频/视频是否就绪的信息 |
 * | HAVE_METADATA   | 1  |  音频/视频已初始化 |
 * | HAVE_CURRENT_DATA |    2  |  数据已经可以播放(当前位置已经加载) 但没有数据能播放下一帧的内容 |
 * | HAVE_FUTURE_DATA |    3  |  当前及至少下一帧的数据是可用的(换句话来说至少有两帧的数据) |
 * | HAVE_ENOUGH_DATA |   4   |  可用数据足以开始播放-如果网速得到保障 那么视频可以一直播放到底 |
 *
 * @see <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/readyState">Web API 接口参考 _ MDN</a>
 */
export enum MediaReadyState {
    HAVE_NOTHING,
    HAVE_METADATA,
    HAVE_CURRENT_DATA,
    HAVE_FUTURE_DATA,
    HAVE_ENOUGH_DATA
}

/**
 * 在 {@link MediaReadyState} 之外 扩充定义的状态
 */
export enum ExtendedState {
    /**
     * 未初始化
     */
    UNINITIALIZED = -1,
    /**
     * 播放完成
     */
    PLAY_FINISHED = 10
}

export type VideoState = MediaReadyState | ExtendedState

/**
 * 媒体网络状态
 * @see <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/networkState">HTMLMediaElement.networkState - Web API 接口参考 _ MDN</a>
 */
export enum MediaNetworkState {
    /**
     * 没有数据
     */
    NETWORK_EMPTY = 0,
    /**
     * 网络空闲
     */
    NETWORK_IDLE = 1,
    /**
     * 正在下载
     */
    NETWORK_LOADING = 2,
    /**
     * 没有找到 src
     */
    NETWORK_NO_SOURCE = 3
}
