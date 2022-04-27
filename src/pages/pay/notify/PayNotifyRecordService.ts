
import { cloud } from '@/cloud';
import { BaseMo } from '@/model/BaseMo';
import { PayNotifyRecord } from "@/model/entity/PayNotifyRecord"
import { LogicDelete } from '@/model/LogicDelete';
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
     * 分页查询支付通知信息
     * @param q 查询对象
     * @returns 支付通知分页列表
     */
    async page(q: PayNotifyRecordQo): Promise<BaseMo<PayNotifyRecord>> {
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
}
