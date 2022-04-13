import { CoreExam } from "@/model/entity/CoreExam";
import { QuestionService } from "@/components/Exam/service/QuestionService";
import { cloud } from "@/cloud";
import { getUserId } from "@/api/token";
import { ObjectUtil } from "typescript-util";
import { getLogger } from "@/main";
import { CommonEnum } from "@/model/CommonEnum";

/**
 * 题目服务类实现
 */
class QuestionServiceImpl implements QuestionService {

    private readonly log = getLogger('QuestionService')

    /**
     * 列表查询考试信息
     * @returns 考试列表
     */
    async list(): Promise<Array<CoreExam>> {
        const dbTemplate = cloud.database();
        const res = await dbTemplate.collection(CoreExam.TABLE_NAME)
            .get<CoreExam>()
        return res.data
    }


    /**
     * 分页查询考试信息
     * @param size  偏移量
     * @param current 分页大小
     * @returns 考试分页列表
     */
    async page(size: number, current: number): Promise<Array<CoreExam>> {
        const dbTemplate = cloud.database();
        const res = await dbTemplate.collection(CoreExam.TABLE_NAME)
            .skip(size * (current - 1))
            .limit(size)
            .get<CoreExam>()
        return res.data
    }

    /**
     * 统计
     * @returns 总记录数
     */
    async count(): Promise<number> {
        const dbTemplate = cloud.database();
        const { total } = await dbTemplate.collection(CoreExam.TABLE_NAME).count()
        return total
    }

    /**
     * 保存考试
     * @param obj 考试对象
     * @returns true | false
     */
    async saveObj(obj: CoreExam): Promise<string> {
        const dbTemplate = cloud.database();
        this.init(obj, CommonEnum.ACTION_ADD)
        const { id, error } = await dbTemplate.collection(CoreExam.TABLE_NAME).add({ obj })
        if (ObjectUtil.isNull(id)) {
            this.log.error("save exam error `{}` ", error)
            throw new Error(error)
        }
        return id as string
    }

    /**
     * 修改考试对象
     * @param obj 考试对象
     * @returns true | false
     */
    async updateById(obj: CoreExam): Promise<boolean> {
        const dbTemplate = cloud.database();
        this.init(obj, CommonEnum.ACTION_UPDATE)
        const result = await dbTemplate
            .collection(CoreExam.TABLE_NAME)
            .doc(obj._id)
            .update({ obj })
        this.log.debug("更新考试记录", result)
        return true
    }

    async removeById(examId: string): Promise<boolean> {
        const dbTemplate = cloud.database()
        const res = dbTemplate.collection(CoreExam.TABLE_NAME)
        .where({_id:examId})
        .remove()
        this.log.debug("删除考试")
        return true
    }

    async removeQuestionById(examId: string, questionId: string): Promise<boolean> {
        const dbTemplate = cloud.database()
        const res = await dbTemplate.collection(CoreExam.TABLE_NAME)
        .where({_id:examId})
        .update({
            $pull: {
                questions: { quId: questionId }
            }
        })
        this.log.debug("删除考试中的题目",res)
        return true
    }

    private init(obj: CoreExam, flag: string): void {
        const curTime = Date.now()
        const curUserId = getUserId()
        if (CommonEnum.ACTION_ADD === flag) {
            obj.createTime = curTime
            obj.updateTime = curTime
            obj.createBy = curUserId
            obj.updateBy = curUserId
        } else {
            obj.updateTime = curTime
            obj.updateBy = curUserId
        }
    }
}

