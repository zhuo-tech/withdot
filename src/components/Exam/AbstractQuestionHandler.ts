/**
 * 题目抽象类；
 * 不同题目继承此类；并实现相关的方法
 */
abstract class AbstractQuestionHandler<T> {

    /**
     * 保存答题记录
     * @param obj 题目对象
     * @return 成功｜失败
     */
    abstract saveObj(obj: T): boolean

    /**
     * 根据题目ID删除测试中的题目
     * @param quesitonId 题目类型
     * @return 成功｜失败
     */
    abstract removeById(quesitonId: string): boolean

    /**
     * 编辑题目记录
     * @param obj 题目对象
     * @return 成功｜失败
     */
    abstract updateById(obj: T): boolean

}