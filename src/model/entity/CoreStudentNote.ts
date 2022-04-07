import { BaseEntity } from '@/model/BaseEntity'

/**
 * 学员笔记
 */
export class CoreStudentNote implements BaseEntity {

    public static readonly TABLE_NAME = 'core_student_note'

    /**
     * 学生ID
     */
    public studentId: string

     /**
     * 专辑ID
     */
    public albumId: string

    /**
     * 作品ID
     */
    public workId: string

    /**
     * 笔记
     */
    public profile: string

     /**
     * 标签
     * @type {Array<string>}
     */
    public tags: Array<string>

    public _id: string
    public createBy: string
    public createTime: number
    public updateBy: string
    public updateTime: number
}
