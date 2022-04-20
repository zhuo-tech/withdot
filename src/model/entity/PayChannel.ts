/**
 * 支付渠道
 */
export class PayChannel {

  public static readonly TABLE_NAME = 'pay_channel'

  /**
   * 主键
   */
  _id: string

  /**
   * 渠道商户ID | 12****123
   */
  mchId: string

  /**
   * 渠道ID
   */
  channelId: string

  /**
   * 渠道名称,如:alipay,wechat
   */
  channelName: string

  /**
   * 渠道商户ID | 12****123
   */
  channelMchId: string

  /**
   * 前端回调地址
   */
  returnUrl: string

  /**
   * 后端回调地址
   */
  notifyUrl: string

  /**
   * 渠道状态
   */
  state: string

  /**
   * 配置参数,json字符串
   *  {
   *  "keyPath":"/mnt/certificate/1607542476/apiclient_cert.p12",
   *  "keyPem":"/mnt/certificate/1607542476/apiclient_key.pem",
   *  "certPem":"/mnt/certificate/1607542476/apiclient_cert.pem",
   *  "secret":"52fea31108b53c90a87a913c6d3cf722",
   *  "partnerKey":"kissmeqwertyuiopasdfghjklzxcvbnm"
   *  }
   */
  param: {
    keyPath: string
    keyPem: string
    certPem: string
    secret: string
    partnerKey: string
  }

  /**
   * 应用ID
   */
  appId: string

  /**
   * 备注
   */
  remark: string

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

  /**
   * 保存param字符串形式，用来展示
   */
  paramText:string
}
