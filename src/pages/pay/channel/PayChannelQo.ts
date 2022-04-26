import { BasePage } from "@/model/BasePage"
/**
 * 支付渠道查询对象
 * @author HK
 * @date 2022年04月01日 17点13分
 */
export class PayChannelQo extends BasePage {
  channelMchId?: string
  channelId?: string
  constructor(current: number, size: number) {
    super()
    this.current = current
    this.size = size
  }
}