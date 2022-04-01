import { BaseEntity } from '@/model/BaseEntity'

/**
 * 系统角色信息表
 */
export class SysRole implements BaseEntity {

    public static readonly TABLE_NAME = 'sys_role'

    /**
     * 主键
     */
    public _id: string

    /**
     * 描述
     */
    public description: string

    /**
     * 角色名称
     */
    public label: string

    /**
     * 角色编码
     */
    public name: string

    /**
     * 权限
     */
    public permissions: []

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
