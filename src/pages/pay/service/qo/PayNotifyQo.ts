import { BasePage } from "@/model/BasePage"

export class PayNotifyQo extends BasePage {
    orderNo: string
    constructor(current: number, size: number, orderNo: string) {
        super()
        this.current = current
        this.size = size
        this.orderNo = orderNo
    }
}