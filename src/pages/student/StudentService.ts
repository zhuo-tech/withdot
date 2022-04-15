import { cloud } from "@/cloud";
import { BaseMo } from "@/model/BaseMo";
import { CoreStudent } from "@/model/entity/CoreStudent";
import { LogicDelete } from "@/model/LogicDelete";
import { StudentQo } from "@/pages/student/StudentQo";

/**
 * 学生服务
 * @author HK
 * @date 2022年04月01日 17点13分
 */
export class StudentService {
    /**
     * 分页查询学生信息
     * @param q  查询参数
     * @returns 学生分页列表
     */
    async pageByParams(q: StudentQo): Promise<BaseMo<CoreStudent>> {
        const dbTemplate = cloud.database();
        const { current, size, isPay } = q
        const p = { delFlag: LogicDelete.NORMAL }
        if (isPay) {
            p['isPay'] = isPay
        }
        console.log(p)
        const res = await dbTemplate.collection(CoreStudent.TABLE_NAME)
            .where(p)
            .skip(size * (current - 1))
            .limit(size)
            .get<CoreStudent>()
        const { total } = await dbTemplate.collection(CoreStudent.TABLE_NAME)
            .where(p)
            .count()
        return {
            total,
            record: res.data
        };
    }
}

