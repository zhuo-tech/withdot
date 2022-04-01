import { BaseEntity } from '@/model/BaseEntity'
import { FileInfo } from '@/model/FileInfo'

/**
 * 素材信息
 */
export default class CoreMaterial implements BaseEntity {

    public static readonly TABLE_NAME = 'core_material'

    public _id: string
    /**
     * 标题
     * @type {string}
     */
    public title: string

    /**
     * 文件
     * 包含类型和大小
     * @type {FileInfo}
     */
    public file: FileInfo
    /**
     * 地址信息
     * @type {string}
     */
    public href: string
    /**
     * 取自 file.type
     * {@link FileInfo.type}
     */
    public type: string
    /**
     * 标签
     * @type {Array<string>}
     */
    public tag: Array<string>
    public createTime: number
    public updateTime: number
    public createBy: string
    public updateBy: string
}
