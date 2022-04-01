import { BaseEntity } from '@/model/BaseEntity'

/**
 * 系统权限信息表
 */
export class SysPermission implements BaseEntity {

    public static readonly TABLE_NAME = 'sys_permission'

    /**
     * 主键
     */
    public _id: string

    /**
     * 权限编码
     */
    public name: string

    /**
     * 权限名称
     */
    public label: string

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
