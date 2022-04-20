/**
 * 渠道状态
 * @author HK
 * @date 2022年04月01日 17点13分
 */
 export enum PayState {
  /**
  * 正常
  */
  STATUS_0 = "0",
  /**
   * 冻结
   */
  STATUS_1 = "1",


}
export const StatusOptions = [
  { value: '0', label: '正常' },
  { value: '1', label: '冻结' },
]

/**
* 获取名称
* @param key 值
* @returns 支付状态名称
*/
export function getPayStatLabel(key: string): string {
  const o = StatusOptions.find(item => item.value === key)
  return o ? o.label : ''
}
