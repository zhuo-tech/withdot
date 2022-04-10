import { Event, TimeUnit } from 'typescript-util'

/**
 * 鼠标离开可拖动组件事件 <br>
 * 需要这个事件是因为: <br>
 *
 * 控制层会监听 control layer mouse move 事件, 在拖动小组件时 频繁触发控制层显示隐藏令人不适
 * 此事件向播放器通知鼠标离开了拖动容器, 提供离开时间戳, 主要期望控制层能在之后一段时间内抑制其显隐行为
 * @author LL
 * @date 2022-04-10 下午 11:59
 **/
export class DraggableLeaveEvent implements Event {
    /**
     * 建议的抑制时间
     */
    public static readonly INHIBIT_TIME = TimeUnit.SECOND.toMillis(5)

    public timestamp: number

    constructor(timestamp: number) {
        this.timestamp = timestamp
    }

    public getName(): string {
        return DraggableLeaveEvent.name
    }
}
