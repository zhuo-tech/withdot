/**
 * 渠道状态
 * @author HK
 * @date 2022年04月01日 17点13分
 */
 export enum PayParam {
  /**
  * 
  */
  STATUS_keyPath = "keyPath",
  /**
   * 
   */

  STATUS_keyPem = "keyPem",

  STATUS_certPem = "certPem",

  STATUS_secret = "secret",

  STATUS_partnerKey = "partnerKey",


}
export const ParamOptions = [
  { value: 'keyPath', label: 'keyPath' },
  { value: 'keyPem', label: 'keyPem' },
  { value: 'certPem', label: 'certPem' },
  { value: 'secret', label: 'secret' },
  { value: 'partnerKey', label: 'partnerKey' },

]


// param: {
//   keyPath: string
//   keyPem: string
//   certPem: string
//   secret: string
//   partnerKey: string
// }



/**
* 获取名称
* @param key 值
* @returns 支付状态名称
*/
export function getPayParam (key: string): (string) {
  const o = ParamOptions.find(item => item.value === key)
  return o ? o.label : ''
}
