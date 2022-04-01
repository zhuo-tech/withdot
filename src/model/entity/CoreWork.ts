import { BaseEntity } from '@/model/BaseEntity'

export class CoreWork implements BaseEntity {

    public static readonly TABLE_NAME = 'core_work'

    public _id: string

    // TODO: ...



    public createBy: string
    public createTime: number
    public updateBy: string
    public updateTime: number

}
