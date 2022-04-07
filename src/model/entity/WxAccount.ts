import { LogicDelete, SupportLogicDelete } from '@/model/LogicDelete'

/**
 * 公众号账户
 * @author gms
 * @date 2019-03-26 22:07:53
 */
export class WxAccount implements SupportLogicDelete {
    public static readonly TABLE_NAME = 'wx_account'
    /**
     * 主键
     */
    public _id: string

    /**
     * 公众号名称
     */
    public name: string

    /**
     * 公众号账户
     */
    public account: string

    /**
     * 公众号appid
     */
    public appid: string

    /**
     * 公众号密钥
     */
    public appSecret: string

    /**
     * 公众号url
     */
    public url: string

    /**
     * 公众号token
     */
    public token: string

    /**
     * 加密密钥
     */
    public aesKey: string

    /**
     * 二维码图片URL
     */
    public qrUrl: string

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
