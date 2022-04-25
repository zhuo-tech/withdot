import { getLogger } from '@/main'
import { TimeUnit } from 'typescript-util'
import { computed, ref, Ref, WritableComputedRef } from 'vue'

export interface VideoReturn {
    playing: Ref<boolean>
    maxDuration: Ref<number>
    playTime: Ref<number>
    volume: WritableComputedRef<number>
    playbackRate: WritableComputedRef<number>
    bufferTime: Readonly<number>
    showEnd: Readonly<boolean>
    status: Ref<VideoState>

    pause(): void

    play(): void

    togglePlayState(): void

    setPlayTime(time: number): void

    onLoadedData(event: Event): void

    onTimeUpdate(event: Event): void

    onLoadStart(event: Event): void

    onLoadMetaData(event: Event): void
}

/**
 * 控制属性 <br>
 * 控制层和对外数据交换的数据模型
 **/
export type ControlModel = Omit<VideoReturn, 'onLoadedData' | 'onLoadMetaData' | 'onLoadStart' | 'onTimeUpdate'> & {
    /**
     * 最小进度时间
     */
    readonly minTime: number
    /**
     * 切换全屏状态
     */
    toggleFullScreen?: () => void
}

const log = getLogger('useVideo')

/**
 * useVideo
 * @author LL
 * @date 2022年04月25日 14点07分
 */
export function useVideo(element: Ref<HTMLVideoElement>): VideoReturn {
    const playing = ref(false)
    const maxDuration = ref(0)
    const playTime = ref(0)

    const status: Ref<VideoState> = ref(ExtendedState.UNINITIALIZED)

    const volume = computed({
        get() {
            return element.value.volume * 100
        },
        set(value: number) {
            element.value.volume = value / 100
        },
    })

    const playbackRate = computed({
        get() {
            return element.value.playbackRate
        },
        set(value: number) {
            element.value.playbackRate = value
        },
    })

    const pause = () => {
        element.value.pause()
        playing.value = false
        log.debug('播放暂停')
    }

    const play = () => {
        element.value.play()
            .then(() => {
                playing.value = true
                log.debug('开始播放')
            })
            .catch(err => log.warn('播放失败', err))
    }

    const updateStatusValue = () => {
        status.value = element.value.readyState
    }

    // noinspection JSUnusedLocalSymbols
    return {
        playing,
        maxDuration,
        playTime,
        pause,
        play,
        status,
        volume,
        playbackRate,
        setPlayTime(time: number) {
            element.value.currentTime = time
        },
        togglePlayState() {
            log.debug('切换播放状态: ', playing.value ? '暂停' : '播放')
            playing.value ? pause() : play()
        },
        onLoadedData(event: Event) {
            updateStatusValue()
            log.trace('加载数据', status.value, event)

            // 初始化最大播放时长
            if (status.value >= MediaReadyState.HAVE_FUTURE_DATA) {
                maxDuration.value = element.value.duration
            }
        },
        onTimeUpdate(event: Event) {
            let time = element.value.currentTime

            log.trace(event.type, '播放时间', TimeUnit.SECOND.display(time))
            updateStatusValue()
            playTime.value = time

            // 播放完成
            if (element.value.ended) {
                status.value = ExtendedState.PLAY_FINISHED
                pause()
            }
        },
        onLoadStart(event: Event) {
        },
        onLoadMetaData(event: Event) {
            updateStatusValue()
        },
        get bufferTime() {
            if (!element.value) {
                return 0
            }
            const buffer: TimeRanges = element.value.buffered
            if (buffer.length <= 0) {
                return 0
            }

            return buffer.end(buffer.length - 1)
        },
        get showEnd() {
            if (playing.value) {
                return false
            }
            return status.value === ExtendedState.PLAY_FINISHED
        },
    }
}

/**
 * 在 {@link MediaReadyState} 之外 扩充定义的状态
 */
export type VideoState = MediaReadyState | ExtendedState

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
