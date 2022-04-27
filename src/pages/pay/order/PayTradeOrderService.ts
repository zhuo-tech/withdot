import { cloud } from '@/cloud';
import { PayTradeOrder } from "@/model/entity/PayTradeOrder"
import { LogicDelete } from '@/model/LogicDelete';
import { BaseMo } from '@/model/BaseMo';
import { PayTradeOrderQo } from '@/pages/pay/order/PayTradeOrderQo';
import { getLogger } from "@/main";

/**
 * 交易记录服务
 * @author HK
 * @date 2022年04月01日 17点13分
 */
export class PayTradeOrderService {

    private readonly log = getLogger('PayTradeOrderService')

    /**
     * 分页查询
     * @param q 查询对象
     * @returns 分页列表
     */
    async page(q: PayTradeOrderQo): Promise<BaseMo<PayTradeOrder>> {
        const dbTemplate = cloud.database();
        const { current, size, status, orderNo } = q
        const p = { delFlag: LogicDelete.NORMAL }
        if (status) {
            p['status'] = status
        }
        if (orderNo) {
            p['orderId'] = orderNo
        }
        console.log(p)
        const res = await dbTemplate.collection(PayTradeOrder.TABLE_NAME)
            .where(p)
            .limit(size)
            .skip(size * (current - 1))
            .get<PayTradeOrder>()
        const { total } = await dbTemplate.collection(PayTradeOrder.TABLE_NAME).where(p).count()
        return {
            total,
            record: res.data
        };
    }

    /**
     * 修改交易对象
     * @param id 交易对象ID
     * @returns true
     */
    async removeById(id: string): Promise<boolean> {
        const dbTemplate = cloud.database()
        const res = dbTemplate.collection(PayTradeOrder.TABLE_NAME)
            .doc(id)
            .update({ delFlag: LogicDelete.DELETED })
        this.log.debug(`删除交易 -> ${res}`)
        return true
    }
}