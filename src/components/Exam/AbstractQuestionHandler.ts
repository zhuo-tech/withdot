/**
 * 题目抽象类；
 * 不同题目继承此类；并实现相关的方法
 */
abstract class AbstractQuestionHandler<T> {

    /**
     * 保存答题记录
     * @param obj 题目对象
     * @return 考试ID
     */
    abstract saveObj(obj: T): string

    /**
     * 编辑题目记录
     * @param obj 题目对象
     * @return 成功｜失败
     */
    abstract updateById(obj: T): boolean

     /**
     * 编辑题目记录
     * @param examId 考试ID
     * @param questionId 题目ID
     * @return 成功｜失败
     */
    abstract removeById(examId: string,questionId: string): boolean

}