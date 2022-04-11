import { InjectionKey } from '@vue/runtime-core'
import { EventCenter, SimpleEventCenter } from 'typescript-util'
import { AspectRatio } from '../service/AspectRatio'
import { DivWrapper } from '../service/DivWrapper'
import { DraggableLeaveEvent } from '../service/DraggableLeaveEvent'
import { PlayerEventRegister } from '../service/PlayerEventRegister'
import { PlayerResizeEvent } from '../service/PlayerResizeEvent'
import { VideoWrapper } from '../service/VideoWrapper'

/**
 * 播放器上下文
 * @author LL
 * @date 2022-04-04 下午 11:25
 **/
export class PlayerContext {
    public static readonly INJECTION_KEY: InjectionKey<PlayerContext> = Symbol.for(PlayerContext.name)

    public eventCenter: EventCenter<PlayerEventRegister> = new SimpleEventCenter<PlayerEventRegister>()

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

    /**
     * 调整大小
     * @param {AspectRatio} aspectRatio 宽高比
     */
    public resizePlayer(aspectRatio: AspectRatio) {
        const {width, height} = aspectRatio
        this.playerBoxElement.resizeHeight(width, height)

        const {width: w, height: h} = this.playerBoxElement.realWidthHeight
        this.pushPlayerResizeEvent(w, h)
    }

    /**
     * 事件发布: 播放器大小调整
     */
    public pushPlayerResizeEvent(width: number, height: number) {
        this.eventCenter.push(new PlayerResizeEvent(width, height))
    }

    /**
     * 事件发布: 离开可拖动组件
     */
    public pushDraggableLeaveEvent(timestamp: number) {
        this.eventCenter.push(new DraggableLeaveEvent(timestamp))
    }

}
