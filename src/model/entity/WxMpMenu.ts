import { LogicDelete, SupportLogicDelete } from '@/model/LogicDelete'

/**
 * 微信菜单表
 * @author gms
 * @date 2019-03-27 20:45:18
 */
export class WxMpMenu implements SupportLogicDelete {
    public static readonly TABLE_NAME = 'wx_mp_menu'
    /**
     * 主键
     */
    public _id: string

    /**
     * 菜单
     */
    public menu: string

    /**
     * 微信公众号ID
     */
    public wxAccountId: string

    /**
     * 微信公众号appid
     */
    public wxAccountAppid: string

    /**
     * 微信公众号名
     */
    public wxAccountName: string

    /**
     * 创建时间
     */
    public createTime: number

    /**
     * 更新时间
     */
    public updateTime: number

    /**
     * 是否删除 -1：已删除 0：正常
     */
    public delFlag: LogicDelete

    public pubFlag: string

}
