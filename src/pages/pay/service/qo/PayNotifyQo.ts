import { BasePage } from "@/model/BasePage"

/**
 * 支付通知查询对象
 * @author HK
 * @date 2022年04月01日 17点13分
 */
export class PayNotifyQo extends BasePage {
    orderNo: string
    constructor(current: number, size: number, orderNo: string) {
        super()
        this.current = current
        this.size = size
        this.orderNo = orderNo
    }
}