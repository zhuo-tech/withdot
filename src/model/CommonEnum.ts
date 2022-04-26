/**
 * 公共枚举类型
 * @author HK
 * @date 2022年04月01日 17点13分
 */
 export enum CommonEnum {
    /**
     * 是
     */
     NORMAL = "normal",
    /**
     * 否
     */
     DISABLE = "disable",

     /**
      * 有用
      */
     USEFUL = "useful",

     /**
      * 无用
      */
     UNUSEFUL = "unuseful",

     /**
      * 正常
      */
      Y= "0",

     /**
      * 禁用
      */
     N = "1",

     /**
      * 添加
      */
     ACTION_ADD = 'add',

     /**
      * 删除
      */
     ACTION_UPDATE = 'update',

     /**
      * 操作成功
      */
     OK = 0
}

export const JustOptions = [
   { value: '0', label: '正常' },
   { value: '1', label: '禁用' }
]

/**
* 获取名称
* @param key 值
* @returns 名称
*/
export function getJustLabel(key: string): string {
   const o = JustOptions.find(item => item.value === key)
   return o ? o.label : '-'
}

export const PayTypeOptions = [
   { value: '0', label: '付费' },
   { value: '1', label: '免费' }
]

/**
* 获取名称
* @param key 值
* @returns 付费状态名称
*/
export function getIsPayLabel(key: string): string {
   const o = PayTypeOptions.find(item => item.value === key)
   return o ? o.label : '-'
}