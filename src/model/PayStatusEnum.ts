/**
 * 支付状态
 * @author HK
 * @date 2022年04月01日 17点13分
 */
export enum PayStatusEnum {
    /**
    * 待支付
    */
    STATUS_0 = "0",
    /**
     * 支付成功
     */
    STATUS_1 = "1",
    /**
     * 支付完成
     */
    STATUS_2 = "2",
    /**
     * 支付失败
     */
    STATUS_ERROR = "-1",
    /**
     * 支付取消
     */
    STATUS_CANCEL = "-2"

}
export const StatusOptions = [
    { value: '0', label: '待支付' },
    { value: '1', label: '支付成功' },
    { value: '2', label: '支付完成' },
    { value: '-1', label: '支付失败' },
    { value: '-2', label: '支付取消' }
]

/**
 * 获取名称
 * @param key 值
 * @returns 支付状态名称
 */
export function getPayStatLabel(key: string): string {
    const o = StatusOptions.find(item => item.value === key)
    return o ? o.label : '-'
}

