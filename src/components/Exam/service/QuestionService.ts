import { CoreExam } from "@/model/entity/CoreExam";

/**
 * 题目服务类
 */
export interface QuestionService {

    /**
     * 列表查询考试信息
     * @returns 考试列表
     */
    list(): Promise<Array<CoreExam>>

    /**
     * 分页查询考试信息
     * @param size  偏移量
     * @param current 分页大小
     * @returns 考试分页列表
     */
    page(size: number, current: number): Promise<Array<CoreExam>>

    /**
     * 统计
     * @returns 总记录数
     */
    count(): Promise<number>

    /**
     * 保存答题记录
     * @param obj 题目对象
     * @return 考试ID
     */
    saveObj(obj: CoreExam): Promise<string>

    /**
     * 编辑题目记录
     * @param obj 题目对象
     * @return 成功｜失败
     */
    updateById(obj: CoreExam): Promise<boolean>

    /**
     * 删除考试
     * @param examId 考试ID
     */
    removeById(examId: string): Promise<boolean>

    /**
     * 编辑某个考试下题目
     * @param examId 考试ID
     * @param questionId 题目ID
     * @return 成功｜失败
     */
    removeById(examId: string, questionId: string): Promise<boolean>

}