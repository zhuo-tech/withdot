/**
 * 支付账单明细
 */
export interface PayUserBill {
  
  /**
   * 主键
   */
  _id: string

  /**
   * 用户uid
   */
  userId: string

  /**
   * 关联id
   */
  linkId: string

  /**
   * 0 = 支出 1 = 获得
   */
  pm: string

  /**
   * 账单标题
   */
  title: string

  /**
   * 明细种类
   *  now_money 金额
   *  buy_vip 会员卡
   */
  category: string

  /**
   * 明细类型
   * pay_product 消费
   */
  type: string

  /**
   * 明细数字
   */
  number: string

  /**
   * 备注
   */
  rmk: string

  /**
   * 0 = 待确定 1 = 有效 -1 = 无效
   */
  status: number

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
  delFlag: string
}
