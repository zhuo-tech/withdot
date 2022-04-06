/**
 * 消息自动回复
 * @author JL
 * @date 2019-04-18 15:40:39
 */
export class WxAutoReply {
    public static readonly TABLE_NAME = 'wx_auto_reply'
    /**
     * 主键
     */
    public _id: string

    /**
     * 公众号ID
     */
    public appId: string

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

    /**
     * 逻辑删除标记（0：显示；1：隐藏）
     */
    public delFlag: string

    /**
     * 类型（1、关注时回复；2、消息回复；3、关键词回复）
     */
    public type: string

    /**
     * 关键词
     */
    public reqKey: string

    /**
     * 请求消息类型（text：文本；image：图片；voice：语音；video：视频；shortvideo：小视频；location：地理位置）
     */
    public reqType: string

    /**
     * 回复消息类型（text：文本；image：图片；voice：语音；video：视频；music：音乐；news：图文）
     */
    public repType: string

    /**
     * 回复类型文本匹配类型（1、全匹配，2、半匹配）
     */
    public repMate: string

    /**
     * 回复类型文本保存文字
     */
    public repContent: string

    /**
     * 回复的素材名、视频和音乐的标题
     */
    public repName: string

    /**
     * 回复类型imge、voice、news、video的mediaID或音乐缩略图的媒体id
     */
    public repMediaId: string

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
     * 缩略图的媒体id
     */
    public repThumbMediaId: string

    /**
     * 缩略图url
     */
    public repThumbUrl: string

    /**
     * 图文消息的内容
     */
    public content: string

}
