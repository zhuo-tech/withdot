/**
 * 公共枚举类型
 * @author HK
 * @date 2022年04月01日 17点13分
 */
 export enum CommonEnum {
    /**
     * 是
     */
     NORMAL = "NORMAL",
    /**
     * 否
     */
     DISABLE = "DISABLE"
}

export const CommonRegExp = {
    NORMAL: new RegExp(CommonEnum.NORMAL),
    DISABLE: new RegExp(CommonEnum.DISABLE)
}
