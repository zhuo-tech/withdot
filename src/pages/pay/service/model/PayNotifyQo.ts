export class PayNotifyQo {
    current: number
    size: number
    orderNo: string

    constructor(current: number, size: number, orderNo: string) {
        this.current = current
        this.size = size
        this.orderNo = orderNo
    }
}