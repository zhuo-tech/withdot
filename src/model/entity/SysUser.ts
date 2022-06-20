/**
 * 前端账号登录信息表
 */
export class SysUser {

    public static readonly TABLE_NAME = 'sys_user'
    /**
     * 主键
     */
    _id: string
    /**
     * 登录账号
     */
    username: string
    /**
     * 昵称
     * @type {string}
     */
    nickname: string
    /**
     * 手机号
     * @type {string}
     */
    phone: string
    /**
     * 头像
     */
    avatar: string
    /**
     * 登录密码
     */
    password?: string
    /**
     * 创建时间
     */
    created_at: number
    /**
     * 更新时间
     */
    updated_at: number

    /**
     * 学习记录
     *  专辑  作品                进度   完成时间
     *  语文  认识26个字母        100%    2020-01-01
     *  语文  常用的词语          10%     -
     *  数学  学会加减乘除        100%    2020-01-01
     *  语文  口算能力提升        10%     -
     */
    schedules?: Array<Schedule>
}


export  class Schedule {

    /**
     * 专辑ID
     */
    albumId: string

    /**
     * 专辑ID
     */
    albumName: string

    /**
     * 作品ID
     */
    workId: string

    /**
     * 作品名称
     */
    workName: string

    /**
     * 专辑学习状态 0完成1未完成
     */
    status: 0 | 1

    /**
     * 作品学习状态
     */
    workStatus: 0 | 1

    /**
     * 作品学习进度 %
     */
    ratio: number

    /**
     * 完成时间
     */
    lastTime?: number
}
