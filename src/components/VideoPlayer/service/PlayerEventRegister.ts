import { EventRegistry } from 'typescript-util'
import { DraggableLeaveEvent } from './DraggableLeaveEvent'
import { PlayerResizeEvent } from './PlayerResizeEvent'

export interface PlayerEventRegister extends EventRegistry {
    PlayerResizeEvent: PlayerResizeEvent
    DraggableLeaveEvent: DraggableLeaveEvent
}
