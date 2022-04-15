import { cloud } from '@/cloud';
import { CommonEnum } from '@/model/CommonEnum';
import { PayGoodsOrder } from "@/model/entity/PayGoodsOrder"
import { LogicDelete } from '@/model/LogicDelete';
import { ObjectUtil } from 'typescript-util';
import { PayGoodsOrderQo } from '@/pages/pay/service/qo/PayGoodsOrderQo';
import { BaseMo } from '@/model/BaseMo';

/**
 * 商品订单服务
 * @author HK
 * @date 2022年04月01日 17点13分
 */
export class PayGoodsOrderService {

    /**
     * 列表查询商品订单信息
     * @returns 商品订单列表
     */
    async list(): Promise<Array<PayGoodsOrder>> {
        const dbTemplate = cloud.database();
        const res = await dbTemplate.collection(PayGoodsOrder.TABLE_NAME)
            .get<PayGoodsOrder>()
        return res.data
    }


    /**
     * 分页查询商品订单信息
     * @param q  查询参数
     * @returns 商品订单分页列表
     */
    async page(q: PayGoodsOrderQo): Promise<BaseMo<PayGoodsOrder>> {
        const dbTemplate = cloud.database();
        const { current, size, status, orderNo } = q
        const p = { delFlag: LogicDelete.NORMAL }
        if (status) {
            p['status'] = status
        }
        if (orderNo) {
            p['payOrderId'] = orderNo
        }
        console.log(p)
        const res = await dbTemplate.collection(PayGoodsOrder.TABLE_NAME)
            .where(p)
            .skip(size * (current - 1))
            .limit(size)
            .get<PayGoodsOrder>()
        const { total } = await dbTemplate.collection(PayGoodsOrder.TABLE_NAME)
            .where(p)
            .count()
        return {
            total,
            record: res.data
        };
    }

    /**
     * 统计
     * @returns 总记录数
     */
    async count(): Promise<number> {
        const dbTemplate = cloud.database();
        const { total } = await dbTemplate.collection(PayGoodsOrder.TABLE_NAME).count()
        return total
    }

    /**
     * 保存商品订单
     * @param obj 商品订单对象
     * @returns 对象ID
     */
    async saveObj(obj: PayGoodsOrder): Promise<string> {
        const dbTemplate = cloud.database();
        this.init(obj, CommonEnum.ACTION_ADD)
        const { id, error } = await dbTemplate.collection(PayGoodsOrder.TABLE_NAME).add({ obj })
        if (ObjectUtil.isNull(id)) {
            this.log.error(`save exam error ${error}`)
            throw new Error(error)
        }
        return id as string
    }

    /**
     * 修改商品订单对象
     * @param obj 商品订单对象
     * @returns true
     */
    async updateById(obj: PayGoodsOrder): Promise<boolean> {
        const dbTemplate = cloud.database();
        this.init(obj, CommonEnum.ACTION_UPDATE)
        const result = await dbTemplate
            .collection(PayGoodsOrder.TABLE_NAME)
            .doc(obj._id)
            .update({ obj })
        this.log.debug(`更新商品订单记录 -> ${result}`)
        return true
    }

    /**
     * 删除商品订单
     * @param id 主键
     * @returns true
     */
    async removeById(id: string): Promise<boolean> {
        const dbTemplate = cloud.database()
        const res = dbTemplate.collection(PayGoodsOrder.TABLE_NAME)
            .doc(id)
            .update({ delFlag: LogicDelete.DELETED })
        this.log.debug(`删除商品订单 -> ${res}`)
        return true
    }

    private init(obj: PayGoodsOrder, flag: string): void {
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