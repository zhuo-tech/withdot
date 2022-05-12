
import { cloud } from '@/cloud';
import { PayGoodsOrder } from "@/model/entity/PayGoodsOrder"
import { LogicDelete } from '@/model/LogicDelete';
import { PayGoodsOrderQo } from '@/pages/pay/goods/PayGoodsOrderQo';
import { BaseMo } from '@/model/BaseMo';
import { getLogger } from "@/main";

/**
 * 商品订单服务
 * @author HK
 * @date 2022年04月01日 17点13分
 */
export class PayGoodsOrderService {
    private readonly log = getLogger('PayGoodsOrderService')
    /**
     * 分页查询商品订单信息
     * @param q  查询参数
     * @returns 商品订单分页列表
     */
    async page(q: PayGoodsOrderQo,starTime?:number,endTime?:number): Promise<BaseMo<PayGoodsOrder>> {
        const dbTemplate = cloud.database();
        const _ = dbTemplate.command
        const { current, size, status, orderNo } = q
        const p = { delFlag: LogicDelete.NORMAL}
        
        if(starTime && endTime){
            p["createTime"] = _.gt(starTime).and(_.lt(endTime))
        }
        if (status) {
            p['status'] = status
        }
        if (orderNo) {
            p['payOrderId'] = orderNo
        }
        
        const res = await dbTemplate.collection(PayGoodsOrder.TABLE_NAME)
            .where(p)
            .skip(size * (current - 1))
            .limit(size)
            .get()
        const { total } = await dbTemplate.collection(PayGoodsOrder.TABLE_NAME)
            .where(p)
            .count()
        return {
            total,
            record: res.data
        };
    }

}


const DB = cloud.database();
const p = { delFlag: LogicDelete.NORMAL}
export function acquire() {
    return DB.collection(PayGoodsOrder.TABLE_NAME)
    .where(p)
    .get();
}