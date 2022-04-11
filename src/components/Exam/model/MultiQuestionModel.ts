import { QuestionTypeEnum } from "@/model/QuestionTypeEnum"

/**
 * 多选题
 */
export class MultiQuestionModel {

    /**
     * 题目ID
     */
     quId: string

     /**
      * 题目名称
      */
     quName: string
 
     /**
      * 题目排序
      */
     sort: number

     quType: QuestionTypeEnum
 
     /**
      * 题目分数
      */
     score: number
 
     /**
      * 题目分数权重；默认为false 按照平均分数分配权重
      */
     scoreWeight: boolean
 
     /**
      * 题目选项
      * label: 名称
      * value: 分数
      */
     options: [{ label: string, value?: number }]
 
     /**
      * 正确答案
      */
     originAnswer: Array<any>
 
     /**
      * 学生答案
      */
     currentAnswers: Array<any>
}