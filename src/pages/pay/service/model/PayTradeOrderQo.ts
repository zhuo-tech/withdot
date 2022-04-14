export class PayTradeOrderQo {
    current: number
    size: number
    status?: string
    orderNo?: string

    constructor(current: number, size: number) {
        this.current = current
        this.size = size
    }
}