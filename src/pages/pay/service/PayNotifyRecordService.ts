import { cloud } from '@/cloud';
import { getLogger } from '@/main';
import { CommonEnum } from '@/model/CommonEnum';
import { PayNotifyRecord } from "@/model/entity/PayNotifyRecord"
import { LogicDelete } from '@/model/LogicDelete';
import { ObjectUtil } from 'typescript-util';

export class PayNotifyRecordService {

    private readonly log = getLogger('PayNotifyRecordService')

    /**
     * 列表查询支付通知信息
     * @returns 支付通知列表
     */
    async list(): Promise<Array<PayNotifyRecord>> {
        const dbTemplate = cloud.database();
        const res = await dbTemplate.collection(PayNotifyRecord.TABLE_NAME)
        .where({delFlag: LogicDelete.NORMAL})
            .get<PayNotifyRecord>()
        return res.data
    }


    /**
     * 分页查询支付通知信息
     * @param current 分页大小
     * @param size  偏移量
     * @returns 支付通知分页列表
     */
    async page(current: number,size: number): Promise<Array<PayNotifyRecord>> {
        const dbTemplate = cloud.database();
        const res = await dbTemplate.collection(PayNotifyRecord.TABLE_NAME)
            .where({delFlag: LogicDelete.NORMAL})
            .limit(size)
            .skip(size * (current - 1))
            .get<PayNotifyRecord>()
        return res.data
    }

    /**
     * 统计
     * @returns 总记录数
     */
    async count(): Promise<number> {
        const dbTemplate = cloud.database();
        const { total } = await dbTemplate.collection(PayNotifyRecord.TABLE_NAME).where({delFlag: LogicDelete.NORMAL}).count()
        return total
    }

    /**
     * 保存支付通知
     * @param obj 支付通知对象
     * @returns 通知ID
     */
    async saveObj(obj: PayNotifyRecord): Promise<string> {
        const dbTemplate = cloud.database();
        this.init(obj, CommonEnum.ACTION_ADD)
        const { id, error } = await dbTemplate.collection(PayNotifyRecord.TABLE_NAME).add({ obj })
        if (ObjectUtil.isNull(id)) {
            this.log.error("save exam error `{}` ", error)
            throw new Error(error)
        }
        return id as string
    }

    /**
     * 修改支付通知对象
     * @param obj 支付通知对象
     * @returns true
     */
    async updateById(obj: PayNotifyRecord): Promise<boolean> {
        const dbTemplate = cloud.database();
        this.init(obj, CommonEnum.ACTION_UPDATE)
        const result = await dbTemplate
            .collection(PayNotifyRecord.TABLE_NAME)
            .doc(obj._id)
            .update({ obj })
        this.log.debug("更新支付通知记录", result)
        return true
    }

    /**
    * 逻辑删除
    * @param id 主键
    * @returns true
    */
    async deleteById(id: string): Promise<boolean> {
        const dbTemplate = cloud.database();
        const result = await dbTemplate
            .collection(PayNotifyRecord.TABLE_NAME)
            .doc(id)
            .update({delFlag: LogicDelete.DELETED})
        this.log.debug("删除支付通知 `{}` ", result)
        return true
    }

    /**
    * 删除
    * @param id 主键
    * @returns true
    */
     async removeById(id: string,): Promise<boolean> {
        const dbTemplate = cloud.database()
        const res = dbTemplate.collection(PayNotifyRecord.TABLE_NAME)
            .where({ _id: id })
            .remove()
        this.log.debug("删除支付通知")
        return true
    }

    private init(obj: PayNotifyRecord, flag: string): void {
        const curTime = Date.now()
        if (CommonEnum.ACTION_ADD === flag) {
            obj.createTime = curTime
            obj.updateTime = curTime
            obj.delFlag = LogicDelete.NORMAL
        } else {
            obj.updateTime = curTime
        }
    }
}