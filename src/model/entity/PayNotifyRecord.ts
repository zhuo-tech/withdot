/**
 * 异步通知记录
 */
export class PayNotifyRecord {

  public static readonly TABLE_NAME = 'pay_notify_record'
  
  /**
   * 主键
   */
  _id: string

  /**
   * 响应ID
   */
  notifyId: string

  /**
   * 请求报文
   */
  request: string

  /**
   * 响应报文
   */
  response: string

  /**
   * 系统订单号
   */
  orderNo: string

  /**
   * http状态
   */
  httpStatus: string

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
