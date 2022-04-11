import { CoreExamDotConfig } from "@/model/entity/CoreDot";
import { MultiQuestionModel } from "@/components/Exam/model/MultiQuestionModel";

/**
 * 多选题实现逻辑
 */
class MultiQuestionHandler extends AbstractQuestionHandler<CoreExamDotConfig<MultiQuestionModel>> {
    
    /**
     * 保存
     * @param obj 单选题
     * @return true | false
     */
    saveObj(obj: CoreExamDotConfig<MultiQuestionModel>): boolean {
        throw new Error("Method not implemented.");
    }

    /**
     * 删除
     * @param quesitonId 题目ID
     */
    removeById(quesitonId: string): boolean {
        throw new Error("Method not implemented.");
    }

    /**
     * 更新
     * @param obj 单选题
     */
    updateById(obj: CoreExamDotConfig<MultiQuestionModel>): boolean {
        throw new Error("Method not implemented.");
    }

}