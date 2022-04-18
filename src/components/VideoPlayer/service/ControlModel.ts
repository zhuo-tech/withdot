/**
 * 控制属性 <br>
 * 控制层和对外数据交换的数据模型
 * @author LL
 * @date 2022-04-17 上午 1:11
 **/
export interface ControlModel {

    /**
     * 播放状态
     */
    readonly playing: boolean
    /**
     * 当前播放时间
     */
    readonly time: number
    /**
     * 缓冲时间
     */
    readonly bufferTime: number
    /**
     * 最小进度时间
     */
    readonly minTime: number
    /**
     * 最大时间
     */
    readonly maxTime: number
    /**
     * 播放倍速
     */
    playbackRate: number
    /**
     * 音量
     */
    volume: number
    /**
     * 设置播放时间
     */
    setPlayTime?: (time: number) => void
    /**
     * 播放
     */
    play?: () => void
    /**
     * 暂停
     */
    pause?: () => void
    /**
     * 切换全屏状态
     */
    toggleFullScreen?: () => void
}
