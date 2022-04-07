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
     DELETE_N = "0",

     /**
      * 删除
      */
     DELETE_Y = "1"
}

export const CommonRegExp = {
    NORMAL: new RegExp(CommonEnum.NORMAL),
    DISABLE: new RegExp(CommonEnum.DISABLE),
    USEFUL: new RegExp(CommonEnum.USEFUL),
    UNUSEFUL: new RegExp(CommonEnum.UNUSEFUL),
    DELETE_N: new RegExp(CommonEnum.DELETE_N),
    DELETE_Y: new RegExp(CommonEnum.DELETE_Y)
}
