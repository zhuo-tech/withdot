
import { cloud } from '@/cloud';
import { BaseMo } from '@/model/BaseMo';
import { CommonEnum } from '@/model/CommonEnum';
import { PayNotifyRecord } from "@/model/entity/PayNotifyRecord"
import { LogicDelete } from '@/model/LogicDelete';
import { ObjectUtil } from 'typescript-util';
import { PayNotifyRecordQo } from '@/pages/pay/notify/PayNotifyRecordQo';
import { getLogger } from "@/main";

/**
 * 支付通知服务
 * @author HK
 * @date 2022年04月01日 17点13分
 */
export class PayNotifyRecordService {
    private readonly log = getLogger("PayNotifyRecordService");

    /**
     * 列表查询支付通知信息
     * @returns 支付通知列表
     */
    async list(): Promise<Array<PayNotifyRecord>> {
        const dbTemplate = cloud.database();
        const res = await dbTemplate
            .collection(PayNotifyRecord.TABLE_NAME)
            .where({ delFlag: LogicDelete.NORMAL })
            .get<PayNotifyRecord>();
        return res.data;
    }

    /**
     * 分页查询支付通知信息
     * @param current 当前页
     * @param size  分页大小
     * @returns 支付通知分页列表
     */
    async page(
        current: number,
        size: number
    ): Promise<BaseMo<PayNotifyRecord>> {
        const dbTemplate = cloud.database();
        const res = await dbTemplate
            .collection(PayNotifyRecord.TABLE_NAME)
            .where({ delFlag: LogicDelete.NORMAL })
            .limit(size)
            .skip(size * (current - 1))
            .get<PayNotifyRecord>();
        const { total } = await dbTemplate
            .collection(PayNotifyRecord.TABLE_NAME)
            .where({ delFlag: LogicDelete.NORMAL })
            .count();
        return {
            total,
            record: res.data,
        };
    }

    /**
     * 分页查询支付通知信息
     * @param q 查询对象
     * @returns 支付通知分页列表
     */
    async pageByParams(q: PayNotifyRecordQo): Promise<BaseMo<PayNotifyRecord>> {
        const dbTemplate = cloud.database();
        const { current, size, orderNo } = q;
        const p = { delFlag: LogicDelete.NORMAL };
        if (orderNo) {
            p["orderNo"] = orderNo;
        }
        const { data } = await dbTemplate
            .collection(PayNotifyRecord.TABLE_NAME)
            .where(p)
            .limit(size)
            .skip(size * (current - 1))
            .get<PayNotifyRecord>();

        const { total } = await dbTemplate
            .collection(PayNotifyRecord.TABLE_NAME)
            .where(p)
            .count();
        return {
            total,
            record: data,
        };
    }

    /**
     * 统计
     * @returns 总记录数
     */
    async count(): Promise<number> {
        const dbTemplate = cloud.database();
        const { total } = await dbTemplate
            .collection(PayNotifyRecord.TABLE_NAME)
            .where({ delFlag: LogicDelete.NORMAL })
            .count();
        return total;
    }

    /**
     * 保存支付通知
     * @param obj 支付通知对象
     * @returns 通知ID
     */
    async saveObj(obj: PayNotifyRecord): Promise<string> {
        const dbTemplate = cloud.database();
        this.init(obj, CommonEnum.ACTION_ADD);
        const { id, error } = await dbTemplate
            .collection(PayNotifyRecord.TABLE_NAME)
            .add({ obj });
        if (ObjectUtil.isNull(id)) {
            this.log.error(`save notify error -> ${error}`);
            throw new Error(error);
        }
        return id as string;
    }

    /**
     * 修改支付通知对象
     * @param obj 支付通知对象
     * @returns true
     */
    async updateById(obj: PayNotifyRecord): Promise<boolean> {
        const dbTemplate = cloud.database();
        this.init(obj, CommonEnum.ACTION_UPDATE);
        const result = await dbTemplate
            .collection(PayNotifyRecord.TABLE_NAME)
            .doc(obj._id)
            .update({ obj });
        this.log.debug(`更新支付通知记录 -> ${result}`);
        return true;
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
            .update({ delFlag: LogicDelete.DELETED });
        this.log.debug(`删除支付通知 -> ${result}`);
        return true;
    }

    private init(obj: PayNotifyRecord, flag: string): void {
        const curTime = Date.now();
        if (CommonEnum.ACTION_ADD === flag) {
            obj.createTime = curTime;
            obj.updateTime = curTime;
            obj.delFlag = LogicDelete.NORMAL;
        } else {
            obj.updateTime = curTime;
        }
    }
}
