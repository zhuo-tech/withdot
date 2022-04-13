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
      * @deprecated
      */
     DELETE_N = "0",

     /**
      * 删除
      * @deprecated
      */
     DELETE_Y = "1",

     /**
      * 添加
      */
     ACTION_ADD = 'add',

     /**
      * 删除
      */
     ACTION_UPDATE = 'update'
}
