import { BaseEntity } from '@/model/BaseEntity'

export class CoreStudent implements BaseEntity {
    public static readonly TABLE_NAME = 'core_student'
    public _id: string
    public createBy: string
    public createTime: number
    public updateBy: string
    public updateTime: number

    name: string
    phone: number
    userId: number
    avatar: string
    lastLoginTime: number
    /**
     * 0 付费学员 1 未付费学员
     */
    isPay: number
}
