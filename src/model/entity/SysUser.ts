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
}
