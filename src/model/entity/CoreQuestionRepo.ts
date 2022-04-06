import { BaseEntity } from '@/model/BaseEntity'
import { CommonEnum } from '@/model/CommonEnum'
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
    public name: string

    /**
     * 题目内容；富文本
     */
    public content?: string

    /**
     * 整题解析;富文本
     */
    public analysis: string

    /**
     * 题目类型
     * RADIO 单选题; MULTI 多选题; JUDGE 判断题; SAQ 简单题
     */
    public type: QuestionTypeEnum.JUDGE | QuestionTypeEnum.MULTI | QuestionTypeEnum.RADIO | QuestionTypeEnum.SAQ

    /**
     * 排序
     */
    public sort: number

    /**
     * 题目明细
     * @type {Array<any>}
     */
    public items: Array<QuestionDetails>

    public _id: string
    public createTime: number
    public updateTime: number
    public createBy: string
    public updateBy: string

}

export class QuestionDetails {
    /**
     * 主键
     */
     public _id: string

     /**
      * 题目ID
      */
     public questionId: string

    /**
     * 是否是答案
     */
     public isAnswer: CommonEnum.NORMAL | CommonEnum.DISABLE

     /**
      * 答案内容
      */
     public content: string

     /**
      * 答案分析
      */
     public analysis: string
}