import { BaseEntity } from '@/model/BaseEntity'
import { CommonEnum } from '@/model/CommonEnum'
import { FileInfo } from '@/model/FileInfo'

/**
 * 作品信息表
 */
export class CoreWork implements BaseEntity {

    public static readonly TABLE_NAME = 'core_work'

    public _id: string

    /**
     * 作品名称
     */
    public name:string

    /**
     * 作品简介
     */
    public profile: string

    /**
     * 作品内容详情
     */
    public content: string

    /**
     * 作品封面
     * key: 标识终端 mc移动端;pc为网页端
     * label: 文件名称
     * value: 文件地址
     */
    public covers: {
        mp: FileInfo,
        pc: FileInfo,
    }

    /**
     * 是否试看默认否
     */
     public isTry: CommonEnum.NORMAL | CommonEnum.DISABLE

     /**
      * 试看时长
      * 单位秒（s）
      */
     public tryDuration: number

     /**
     * 是否免费默认否
     */
    public isFree: CommonEnum.NORMAL | CommonEnum.DISABLE

    public createBy: string
    public createTime: number
    public updateBy: string
    public updateTime: number

}
