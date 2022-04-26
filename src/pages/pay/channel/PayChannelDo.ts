import { PayChannel } from "@/model/entity/PayChannel"
/**
 * 支付参数
 * @author HK
 * @date 2022年04月01日 17点13分
 */
export class PayChannelDo extends PayChannel {
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
  keyPath?: string
  keyPem: string
  certPem: string
  secret: string
  partnerKey: string

}
