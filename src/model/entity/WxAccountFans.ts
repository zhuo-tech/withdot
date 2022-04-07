import { LogicDelete, SupportLogicDelete } from '@/model/LogicDelete'

export class WxAccountFans implements SupportLogicDelete {
    public static readonly TABLE_NAME = 'wx_account_fans'
    /**
     * 主键
     */
    public _id: string

    /**
     * 用户标识
     */
    public openid: string

    /**
     * 订阅状态，0未关注，1已关注
     */
    public subscribeStatus: string

    /**
     * 订阅时间
     */
    public subscribeTime: number

    /**
     * 昵称
     */
    public nickname: string | RegExp

    /**
     * 性别，1男，2女，0未知
     */
    public gender: string

    /**
     * 语言
     */
    public language: string

    /**
     * 国家
     */
    public country: string

    /**
     * 省份
     */
    public province: string

    /**
     * 城市
     */
    public city: string

    /**
     * 头像地址
     */
    public avatarUrl: string

    /**
     * 备注
     */
    public remark: string

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
    public wxAccountName: string | RegExp

    /**
     * 标签ID列表
     */
    public tagIds: Array<string>

    /**
     * 创建时间
     */
    public createTime: number

    /**
     * 更新时间
     */
    public updateTime: number

    public delFlag: LogicDelete

}
