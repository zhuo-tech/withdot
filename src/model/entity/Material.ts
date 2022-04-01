import { BaseEntity } from '@/model/BaseEntity'
import { FileInfo } from '@/model/FileInfo'

/**
 * 素材信息
 */
export default class Material implements BaseEntity {

    public static readonly TABLE_NAME = ''

    public _id: string
    public title: string
    public file: FileInfo
    public href: string
    public size: number
    public tag: Array<string>
    public createTime: number
    public updateTime: number
    public createBy: string
    public updateBy: string
}
