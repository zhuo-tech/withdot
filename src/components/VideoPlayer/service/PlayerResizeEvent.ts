import { Event } from 'typescript-util'

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
