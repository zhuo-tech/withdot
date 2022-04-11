import { CoreExam } from "@/model/entity/CoreExam";

/**
 * 单选题实现逻辑
 */
class RadioQuestionHandler extends AbstractQuestionHandler<CoreExam> {
   
    removeById(examId: string, questionId: string): boolean {
        throw new Error("Method not implemented.");
    }
    
    /**
     * 保存
     * @param obj 单选题
     * @return true | false
     */
    saveObj(obj: CoreExam): string {
        throw new Error("Method not implemented.");
    }

    /**
     * 更新
     * @param obj 单选题
     */
    updateById(obj: CoreExam): boolean {
        throw new Error("Method not implemented.");
    }

}