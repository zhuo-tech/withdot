import { LogicDelete, SupportLogicDelete } from '@/model/LogicDelete'

/**
 * 微信公众号账号标签
 *
 * @author gms
 * @date 2021/12/31
 */
export class WxAccountTag implements SupportLogicDelete {
    public static readonly TABLE_NAME = 'wx_account_tag'
    /**
     * 主键
     */
    public _id: string

    /**
     * 标签
     */
    public tag: string

    /**
     * 标签ID ， 微信公众平台返回
     */
    public tagId: string

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
     * 创建者
     */
    public createBy: string

    /**
     * 创建时间
     */
    public createTime: number

    /**
     * 更新者
     */
    public updateBy: string

    /**
     * 更新时间
     */
    public updateTime: number

    public delFlag: LogicDelete

}
