/**
 * 微信粉丝消息回复表
 * @author gms
 * @date 2019-03-27 20:45:48
 */
export class WxFansMsgRes {
    public static readonly TABLE_NAME = 'wx_fans_msg_res'
    /**
     * 主键
     */
    public _id: string

    /**
     * 粉丝消息ID
     */
    public fansMsgId: string

    /**
     * 回复内容
     */
    public resContent: string

    /**
     * 用户ID
     */
    public userId: string

    /**
     * 用户名
     */
    public userName: string

    /**
     * 创建时间
     */
    public createTime: number

    /**
     * 更新时间
     */
    public updateTime: number

}
