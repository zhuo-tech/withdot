import { getLogger } from '@/main'
import { LoggerLevel } from '@/tool/log/LoggerLevel'
import { ref, Ref } from 'vue'

/**
 * <h1>HtmlVideoWrapper</h1>
 * 对 {@link HTMLVideoElement} 操作的静态代理, 明确需要哪些DOM 操作, 方便将来加入中间操作 <br>
 *
 * 此处仅列出部分功能, 更多功能如:
 * - 获取缓冲时间范围 {@link HTMLMediaElement.buffered}
 * - 默认播放速率 {@link HTMLMediaElement.defaultPlaybackRate}
 * - 错误状态 {@link HTMLMediaElement.error}
 * - 已播放的资源 {@link HTMLMediaElement.played}
 * - 预加载 {@link HTMLMediaElement.preload}
 * - 资源管理 {@link HTMLMediaElement.src} {@link HTMLMediaElement.srcObject} {@link HTMLMediaElement.currentSrc} {@link HTMLMediaElement.load}
 * - 快速搜索 {@link HTMLMediaElement.fastSeek}
 * - 可能是字幕? {@link HTMLMediaElement.addTextTrack} {@link HTMLMediaElement.textTracks}
 *
 * 更多详细功能参考:
 * @see HTMLVideoElement
 * @see HTMLMediaElement
 * @see HTMLElement
 * @author LL
 * @date 2022-04-04 下午 11:25
 **/
export class VideoWrapper {
    private log = getLogger(VideoWrapper.name, LoggerLevel.ALL)
    /**
     * DOM 引用
     */
    public _element: HTMLVideoElement
    /**
     * 等待就绪的回调函数
     */
    private readyCallback: Array<() => void> = []
    /**
     * 播放回调
     */
    private timeUpdateCallback: Array<(time: number) => void> = []

    /**
     * 内部维护的播放状态, 与 {@link paused} 区别在于 这个字段应该是响应式的
     */
    public playing: boolean = false
    /**
     * 内部维护的视频时长, 单位 秒;  与 {@link videoDuration} 的区别在于 这个字段应该是响应式的
     */
    public maxDuration: number = 0
    /**
     * 内部维护的视频当前播放时间, 单位 秒; <br>
     * 与 {@link currentTime} 的区别在于, 这个字段应该是响应式的, 且这个字段的值应该被同步到 {@link currentTime}; <br>
     * 不直接使用 {@link currentTime} 是为了避免 DOM 引用奇怪的响应式问题, 同时避免更新播放时间时的循环数据流
     */
    public playTime: Ref<number> = ref(0)

    /**
     * 一般在主动拖动进度条时调用, 同步播放时间最好直接设置 {@link playTime}
     */
    public setPlayTime(value: number) {
        this.currentTime = value
        this.log.trace('主动设置播放时间: ', value)
    }

    constructor() {
        // 延迟初始化视频时长
        this.pushReadyCallback(() => {
            const max = this.videoDuration
            this.maxDuration = isNaN(max) ? 0 : max
        })

        // 更新播放时间
        this.pushTimeUpdateCallback((time) => {
            this.playTime.value = time
        })

    }

    private get element(): HTMLVideoElement {
        if (!this._element) {
            throw new Error('Element 尚未初始化')
        }
        return this._element
    }

    /**
     * 延迟初始化 element
     * <h3 color="yellow">如果此方法没有得到调用, 此类没有任何意义, 后续所有调用都会报错</h3>
     * 允许重复多次调用, 忽略相同引用的赋值
     * @param {HTMLVideoElement} video
     */
    public setElement(video: HTMLVideoElement) {
        // vite 重载时候 video 为 null, 如果缺少此判断 直接设置 element 会导致循环渲染 堆栈溢出 (Wrapper 对象 在 script 中是响应式对象)
        if (!video) {
            this.log.trace('尝试设置 空元素, 跳过')
            return
        }
        if (this._element !== video) {
            this._element = video
            this.log.trace('DOM 引用初始化')

            this.element.onloadeddata = () => {
                if (this.element.readyState >= MediaReadyState.HAVE_FUTURE_DATA) {
                    for (let cb of this.readyCallback) {
                        try {
                            cb?.()
                        } catch (e) {
                            this.log.warn('就绪回调执行失败', e)
                        }
                    }
                }
            }

            this.element.ontimeupdate = (event) => {
                this.log.trace('timeupdate', event)
                for (const cb of this.timeUpdateCallback) {
                    try {
                        cb(this.currentTime)
                    } catch (e) {
                        this.log.trace(e)
                    }
                }
            }
        }
    }

    /**
     * 视频资源的宽度
     */
    public get videoWidth(): number {
        return this.element.videoWidth
    }

    /**
     * 视频资源的高度
     */
    public get videoHeight(): number {
        return this.element.videoHeight
    }

    /**
     * 视频资源的总时长, 单位秒
     * @return {number} 如果不可用, 返回 NaN, 如果正在加载中, 返回 Infinity
     */
    public get videoDuration(): number {
        return this.element.duration
    }

    /**
     * 当前播放是否结束
     */
    public get ended(): boolean {
        return this.element.ended
    }

    /**
     * 当前网络活动
     */
    public get networkState(): number {
        return this.element.networkState
    }

    /**
     * 播放是否暂停
     * @see HTMLVideoElement.pause()
     * @see HTMLVideoElement.play()
     */
    public get paused(): boolean {
        return this.element.paused
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
     * @see MediaReadyState
     */
    public get readyState(): MediaReadyState {
        return this.element.readyState
    }

    public isReady(): boolean {
        return this.readyState > MediaReadyState.HAVE_CURRENT_DATA
    }

    /**
     * 设置就绪回调
     */
    public pushReadyCallback(callback?: () => void) {
        if (callback) {
            this.readyCallback.push(callback)
        }
    }

    public pushTimeUpdateCallback(callback: (time: number) => void) {
        this.timeUpdateCallback.push(callback)
    }

    /* 以上, 只读属性 -----------------------------------------------------------------------------  */

    /**
     * 实际宽度
     */
    public get width() {
        return this.element.width
    }

    public set width(width: number) {
        this.element.width = width
    }

    /**
     * 实际高度
     * @return {number}
     */
    public get height() {
        return this.element.height
    }

    public set height(height: number) {
        this.element.height = height
    }

    /**
     * 是否自动播放
     */
    public get autoplay(): boolean {
        return this.element.autoplay
    }

    public set autoplay(auto: boolean) {
        this.element.autoplay = auto
    }

    /**
     * 是否显示默认控制器
     */
    public get controls() {
        return this.element.controls
    }

    public set controls(controls: boolean) {
        this.element.controls = controls
    }

    /**
     * 当前播放时间
     */
    public get currentTime() {
        return this._element?.currentTime ?? 0
    }

    public set currentTime(currentTime: number) {
        this.element.currentTime = currentTime
    }

    /**
     * 默认静音
     * @see muted
     */
    public get defaultMuted() {
        return this.element.defaultMuted
    }

    public set defaultMuted(defaultMuted: boolean) {
        this.element.defaultMuted = defaultMuted
    }

    /**
     * 静音
     * @see defaultMuted
     */
    public get muted() {
        return this.element.muted
    }

    public set muted(muted: boolean) {
        this.element.muted = muted
    }

    /**
     * 洗脑循环
     */
    public get loop() {
        return this.element.loop
    }

    public set loop(loop: boolean) {
        this.element.loop = loop
    }

    /**
     * 播放速率
     */
    public get playbackRate() {
        return this.element.playbackRate
    }

    public set playbackRate(playbackRate: number) {
        this.element.playbackRate = playbackRate
    }

    /**
     * 音量
     */
    public get volume() {
        return this.element.volume * 100
    }

    public set volume(volume: number) {
        this.element.volume = volume / 100
    }

    /**
     * 暂停
     * @see togglePlayState
     */
    public pause() {
        this.element.pause()
        this.log.trace('播放暂停')
    }

    /**
     * 播放
     * @see togglePlayState
     */
    public play() {
        this.element.play()
            .then(() => this.log.debug('开始播放'))
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
        this.playing = !this.playing
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
