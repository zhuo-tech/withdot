import { BaseEntity } from "../BaseEntity";
import { QuestionTypeEnum } from "../QuestionTypeEnum";

/**
 * 学员考试记录
 */
export default class CoreStudentExamLog implements BaseEntity {
    
    public static readonly TABLE_NAME = 'core_student_exam_log'

    /**
     * 考试记录
     */
    _id: string;

    /**
     * 学生ID
     */
    studentId: string

    /**
     * 打点ID
     */
    dotId: string

    /**
     * 作品ID
     */
    workerId: string

    /**
     * 考试成绩
     */
    score: number

    /**
     * 答题记录
     */
    answerLogs: Array<AnswerLog>
    createTime: number;
    updateTime: number;
    createBy: string;
    updateBy: string;
}

/**
 * 答题记录信息
 */
export class AnswerLog {

    /**
     * 题目ID
     */
    quId: string

    /**
     * 题目名称
     */
    quName: string

    /**
     * 题目类型
     */
    quType: QuestionTypeEnum

    /**
     * 题目排序
     */
    sort: number

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