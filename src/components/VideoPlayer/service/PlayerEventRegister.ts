import { EventRegistry } from 'typescript-util'
import { PlayerResizeEvent } from './PlayerResizeEvent'

export interface PlayerEventRegister extends EventRegistry {
    PlayerResizeEvent: PlayerResizeEvent
}
