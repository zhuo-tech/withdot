import { BaseEntity } from '@/model/BaseEntity'
import { MultiQuestionModel } from '@/components/Exam/model/MultiQuestionModel'
import { RadioQuestionModel } from '@/components/Exam/model/RadioQuestionModel'

/**
 * 考试
 * @author HK
 * @date 2022年04月01日 12点57分
 */
export class CoreExam implements BaseEntity {

    public static readonly TABLE_NAME = 'core_exam'

    _id: string

    /**
     * 考试名称
     */
    label?: string

    /**
     * 考试开始时间
     */
    startTime?: number

    /**
     * 考试结束时间
     */
    endTime?: number

    /**
     * 试题
     */
    questions: Array<Question>
    type:string
    createTime: number
    updateTime: number
    createBy: string
    updateBy: string
}

/**
 * 打点配置
 */
type Question = MultiQuestionModel | RadioQuestionModel
