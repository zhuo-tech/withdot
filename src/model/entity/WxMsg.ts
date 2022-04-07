/**
 * 微信消息
 * @author gms
 * @date 2019-05-28 16:12:10
 */
export class WxMsg {
    public static readonly TABLE_NAME = 'wx_msg'
    /**
     * 主键
     */
    public _id: string

    /**
     * 创建时间
     */
    public createTime: number

    /**
     * 更新时间
     */
    public updateTime: number

    /**
     * 备注
     */
    public remark: string

    /***
     * 公众号ID
     */
    public appId: string

    /**
     * 公众号名称
     */
    public appName: string

    /**
     * 公众号logo
     */
    public appLogo: string

    /**
     * 微信用户ID
     */
    public wxUserId: string

    /**
     * 昵称
     */
    public nickName: string

    /**
     * 头像
     */
    public avatarUrl: string

    /**
     * 微信openId
     */
    public openId: string

    /**
     * 消息分类（1、用户发给公众号；2、公众号发给用户；）
     */
    public type: string

    /**
     * 消息类型（text：文本；image：图片；voice：语音；video：视频；shortvideo：小视频；location：地理位置；music：音乐；news：图文；event：推送事件）
     */
    public repType: string

    /**
     * 事件类型（subscribe：关注；unsubscribe：取关；CLICK、VIEW：菜单事件）
     */
    public repEvent: string

    /**
     * 回复类型文本保存文字
     */
    public repContent: string

    /**
     * 回复类型imge、voice、news、video的mediaID或音乐缩略图的媒体id
     */
    public repMediaId: string

    /**
     * 回复的素材名、视频和音乐的标题
     */
    public repName: string

    /**
     * 视频和音乐的描述
     */
    public repDesc: string

    /**
     * 链接
     */
    public repUrl: string

    /**
     * 高质量链接
     */
    public repHqUrl: string

    /**
     * 图文消息的内容
     */
    public content: string

    /**
     * 缩略图的媒体id
     */
    public repThumbMediaId: string

    /**
     * 缩略图url
     */
    public repThumbUrl: string

    /**
     * 地理位置维度
     */
    public repLocationX: number

    /**
     * 地理位置经度
     */
    public repLocationY: number

    /**
     * 地图缩放大小
     */
    public repScale: number

    /**
     * 已读标记（0：是；1：否）
     */
    public readFlag: number

}
