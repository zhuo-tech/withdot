import { BaseEntity } from '@/model/BaseEntity'

/**
 * 店铺
 * @author LL
 * @date 2022年04月01日 13点05分
 */
export class CoreShop implements BaseEntity {

    public static readonly TABLE_NAME = 'core_shop'

    /**
     * 主键
     */
    public _id: string

    /**
     * 店铺名称
     */
    public title: string

    /**
     * 店铺介绍
     */
    public desc: string

    /**
     * logo
     * key: 标识终端 mc移动端;pc为网页端
     * label: 文件名称
     * value: 文件地址
     */
    public logo: [
        { "key": "mc", "lable": string, "value": string },
        { "key": "pc", "lable": string, "value": string }
    ]

    /**
     * 备案号
     */
    public ipc?: string

    /**
     * 官网地址
     */
    public website?: string

    /**
     * 邮箱
     */
    public email?: string

    /**
     * 二维码
     */
    public qrCode?: Array<any>[]

    /**
     * 手机号码
     */
    public telephone?: string

    /**
     * 微信账号
     */
    public wxAccount?: string

    /**
     * qq账号
     */
    public qqAccount?: string

    /**
    * 地址信息
    */
    public address?: string

    public createBy: string
    public createTime: number
    public updateBy: string
    public updateTime: number

}
