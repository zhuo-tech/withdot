import { Event } from 'typescript-util'

export class PlayerResizeEvent implements Event {
    public static readonly NAME = 'PlayerResizeEvent'

    public width: number
    public height: number

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
    }

    public getName(): string {
        return PlayerResizeEvent.NAME
    }

}
