import { BasePage } from "@/model/BasePage"

/**
 * 商品订单查询对象
 * @author HK
 * @date 2022年04月01日 17点13分
 */
export class PayGoodsOrderQo extends BasePage {
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