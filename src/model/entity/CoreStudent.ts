import { BaseEntity } from '@/model/BaseEntity'

export class CoreStudent implements BaseEntity {
    public _id: string
    public createBy: string
    public createTime: number
    public updateBy: string
    public updateTime: number

    name: string
    phone: number
    userId: number
    avatar: string
    lastLoginTime:number
    isPay:number  //0 付费学员 1 未付费学员
}
