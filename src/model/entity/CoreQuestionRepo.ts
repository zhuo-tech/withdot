import { BaseEntity } from '@/model/BaseEntity'
import { QuestionTypeEnum } from '@/model/QuestionTypeEnum'

/**
 * 题目
 * @author HK
 * @date 2022年04月01日 12点57分
 */
export class CoreQuestionRepo implements BaseEntity {

    public static readonly TABLE_NAME = 'core_question_repo'

    /**
     * 题目名称
     */
    public label: string

    /**
     * 题目内容；富文本
     */
    public content?: string
    /**
     * 题目类型
     * select 选择; JUDGE 判断题; SAQ 简单题
     */
    public type: QuestionTypeEnum

    public _id: string
    public createTime: number
    public updateTime: number
    public createBy: string
    public updateBy: string

}
