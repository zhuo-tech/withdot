/**
 * 系统用户密码表
 */
export class SysUserPassword {

    public static readonly TABLE_NAME = 'sys_user_password'

    /**
     * 主键
     */
    _id: string

    /**
     * 用户ID
     */
    uid: string

    /**
     * 密码
     */
    password: string

    /**
     * 类型
     */
    type: string

    /**
     * 创建时间
     */
    created_at: number

    /**
     * 更新时间
     */
    updated_at: number
}
