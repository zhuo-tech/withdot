import { BaseEntity } from '@/model/BaseEntity'

/**
 * 系统后台管理员账号信息表
 */
export class SysAdmin implements BaseEntity {

    public static readonly TABLE_NAME = 'sys_admin'

    /**
     * 主键
     */
    public _id: string

    /**
     * 登录账号
     */
    public username: string

    /**
     * 仅登录, 创建账号时使用. 表中不保存
     */
    public password?: string

    /**
     * 头像
     */
    public avatar: string

    /**
     * 姓名
     */
    public name: string

    /**
     * 角色
     */
    public roles: Array<string>

    /**
     * 创建时间
     */
    public createTime: number
    public createBy: string

    /**
     * 更新时间
     */
    public updateTime: number
    public updateBy: string

}
