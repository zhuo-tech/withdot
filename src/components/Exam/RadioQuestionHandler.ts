import { CoreExamDotConfig } from "@/model/entity/CoreDot";
import { RadioQuestionModel } from "@/components/Exam/model/RadioQuestionModel";

/**
 * 单选题实现逻辑
 */
class RadioQuestionHandler extends AbstractQuestionHandler<CoreExamDotConfig<RadioQuestionModel>> {
    
    /**
     * 保存
     * @param obj 单选题
     * @return true | false
     */
    saveObj(obj: CoreExamDotConfig<RadioQuestionModel>): boolean {
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
    updateById(obj: CoreExamDotConfig<RadioQuestionModel>): boolean {
        throw new Error("Method not implemented.");
    }

}