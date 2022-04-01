import { BaseEntity } from '@/model/BaseEntity'

/**
 * 店铺
 * @author LL
 * @date 2022年04月01日 13点05分
 */
export class CoreShop implements BaseEntity {

    public static readonly TABLE_NAME = 'core_shop'

    public _id: string

    public title: string

    public desc: string

    public logo: string

    public createBy: string
    public createTime: number
    public updateBy: string
    public updateTime: number




}
