import { EventCenter, EventRegistry, Event } from 'typescript-util'
import { SimpleEventCenter } from 'typescript-util/lib/event/impl/SimpleEventCenter'
import { DivWrapper } from '../service/DivWrapper'
import { VideoWrapper } from '../service/VideoWrapper'
import { InjectionKey } from '@vue/runtime-core'

/**
 * 播放器上下文
 * @author LL
 * @date 2022-04-04 下午 11:25
 **/
export class PlayerContext {
    public static readonly INJECTION_KEY: InjectionKey<PlayerContext> = Symbol.for(PlayerContext.name)

    eventCenter: EventCenter<PlayerEventRegister> = new SimpleEventCenter<PlayerEventRegister>()

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

interface PlayerEventRegister extends EventRegistry {
    PlayerResizeEvent: PlayerResizeEvent
}

export class PlayerResizeEvent implements Event {
    public width: number
    public height: number

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
    }

    public getName(): string {
        return PlayerResizeEvent.name
    }

}
