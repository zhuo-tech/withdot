/**
 * 商品订单表
 */
export class PayGoodsOrder {

  public static readonly TABLE_NAME = 'pay_goods_order'

  /**
   * 主键
   */
  _id: string

  /**
   * 商品名称
   */
  goodsId: string

  /**
   * 商品名称
   */
  goodsName: string

  /**
   * 金额,单位分
   */
  amount: string

  /**
   * 用户openid
   */
  openid: string

  /**
   * 下单人
   */
  userId: string

  /**
   * 订单状态,订单生成(0),支付成功(1),处理完成(2),处理失败(-1)
   */
  status: string

  /**
   * 支付订单号
   */
  payOrderId: string

  /**
   * 备注
   */
  rmk: string

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
