/**
 * 时间段
 */
export class Period {
    public start: number
    public end: number

    constructor(start: number = 0, end: number = 0) {
        this.start = start
        this.end = end
    }
}
