/**
 * 素材信息
 */
export default class Material {
    _id: string
    title: string
    file: FileInfo
    href: string
    size: number
    tag: Array<string>
    createTime: number
    updateTime: number
    createBy: string
    updateBy: string
}

/**
 * 最终保存的文件信息
 * @see File
 */
export class FileInfo {
    name: string
    size: number
    type: string
    href: string
    id: string | number
}
