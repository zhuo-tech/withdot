import { BasePage } from "@/model/BasePage"

export class PayTradeOrderQo extends BasePage {
    current: number
    size: number
    status?: string
    orderNo?: string
    constructor(current: number, size: number) {
        super()
        this.current = current
        this.size = size
    }
}