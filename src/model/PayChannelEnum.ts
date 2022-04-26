/**
 * 支付渠道
 */
export enum PayChannelEnum {

    /**
     * 支付宝手机支付
     */
     ALIPAY_WAP = "ALIPAY_WAP",

     /**
      * 微信扫码支付
      */
     NATIVE = "NATIVE",
 
     /**
      * 微信公众号支付或者小程序支付
      */
     JSAPI = "JSAPI",
 
     /**
      * 聚合支付
      */
     MERGE_PAY = "MERGE_PAY"
}

export const PayChannelOptions = [
    { value: 'JSAPI', label: '微信公众号支付或者小程序支付' },
    { value: 'NATIVE', label: '微信扫码支付' },
    { value: 'MERGE_PAY', label: '聚合支付' },
    { value: 'ALIPAY_WAP', label: '支付宝手机支付' }
]

/**
 * 获取名称
 * @param key 值
 * @returns 支付渠道名称
 */
export function getPayChannelLabel(key: string): string {
    const o = PayChannelOptions.find(item => item.value === key)
    return o ? o.label : '-'
}