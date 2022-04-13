export class PayTradeOrder {

  public static readonly TABLE_NAME = 'pay_trade_order'

  /**
   * 主键
   */
  _id: string

  /**
   * 支付订单号
   */
  orderId: string

  /**
   * 渠道ID
   */
  channelId: string

  /**
   * 支付金额,单位元
   */
  amount: string

  /**
   * 三位货币代码,人民币:cny
   */
  currency: string

  /**
   *  支付状态,0-订单生成,1-支付中(目前未使用),2-支付成功,3-业务处理完成 1 支付成功 2 支付完成 0 待支付 -1 支付失败
   */
  status: string

  /**
   * 客户端IP
   */
  clientIp: string

  /**
   * 设备
   */
  device: string

  /**
   * 商品标题
   */
  subject: string

  /**
   * 商品描述信息
   */
  body: string

  /**
   * 特定渠道发起时额外参数
   */
  extra: string

  /**
   * 渠道商户ID
   */
  channelMchId: string

  /**
   * 渠道订单号
   */
  channelOrderNo: string

  /**
   * 渠道支付错误码
   */
  errCode: string

  /**
   * 渠道支付错误描述
   */
  errMsg: string

  /**
   * 扩展参数1
   */
  param1: string

  /**
   * 扩展参数2
   */
  param2: string

  /**
   * 通知地址
   */
  notifyUrl: string

  /**
   * 通知次数
   */
  notifyCount: number

  /**
   * 最后一次通知时间
   */
  lastNotifyTime: number

  /**
   * 订单失效时间
   */
  expireTime: number

  /**
   * 订单支付成功时间
   */
  paySucTime: number

  /**
   * 创建时间
   */
  createTime: number

  /**
   * 更新时间
   */
  updateTime: number

  /**
   * 删除状态 是否删除 0否1是
   */
  delFlag: number
}
