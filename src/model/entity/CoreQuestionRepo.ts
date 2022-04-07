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
    public label: string

    /**
     * 题目内容；富文本
     */
    public content?: string

    /**
     * 题目类型
     * RADIO 单选题; MULTI 多选题; JUDGE 判断题; SAQ 简单题
     */
    public type: QuestionTypeEnum

    /**
     * 题目明细
     * @type {Array<any>}
     */
    public details: Details

    public _id: string
    public createTime: number
    public updateTime: number
    public createBy: string
    public updateBy: string

}


type Details = RadioQuestion | MultiQuestion


export interface RadioQuestion {

}

export interface MultiQuestion {

}