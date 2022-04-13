import { cloud } from '@/cloud';
import { getLogger } from '@/main';
import { CommonEnum } from '@/model/CommonEnum';
import { PayTradeOrder } from "@/model/entity/PayTradeOrder"
import { LogicDelete } from '@/model/LogicDelete';
import { ObjectUtil } from 'typescript-util';

export class PayTradeOrderService {

    private readonly log = getLogger('PayTradeOrderService')

    /**
     * 列表查询交易信息
     * @returns 交易列表
     */
    async list(): Promise<Array<PayTradeOrder>> {
        const dbTemplate = cloud.database();
        const res = await dbTemplate.collection(PayTradeOrder.TABLE_NAME)
            .get<PayTradeOrder>()
        return res.data
    }


    /**
     * 分页查询交易信息
     * @param size  偏移量
     * @param current 分页大小
     * @returns 交易分页列表
     */
    async page(size: number, current: number): Promise<Array<PayTradeOrder>> {
        const dbTemplate = cloud.database();
        const res = await dbTemplate.collection(PayTradeOrder.TABLE_NAME)
            .skip(size * (current - 1))
            .limit(size)
            .get<PayTradeOrder>()
        return res.data
    }

    /**
     * 统计
     * @returns 总记录数
     */
    async count(): Promise<number> {
        const dbTemplate = cloud.database();
        const { total } = await dbTemplate.collection(PayTradeOrder.TABLE_NAME).count()
        return total
    }

    /**
     * 保存交易
     * @param obj 交易对象
     * @returns true | false
     */
    async saveObj(obj: PayTradeOrder): Promise<string> {
        const dbTemplate = cloud.database();
        this.init(obj, CommonEnum.ACTION_ADD)
        const { id, error } = await dbTemplate.collection(PayTradeOrder.TABLE_NAME).add({ obj })
        if (ObjectUtil.isNull(id)) {
            this.log.error("save exam error `{}` ", error)
            throw new Error(error)
        }
        return id as string
    }

    /**
     * 修改交易对象
     * @param obj 交易对象
     * @returns true | false
     */
    async updateById(obj: PayTradeOrder): Promise<boolean> {
        const dbTemplate = cloud.database();
        this.init(obj, CommonEnum.ACTION_UPDATE)
        const result = await dbTemplate
            .collection(PayTradeOrder.TABLE_NAME)
            .doc(obj._id)
            .update({ obj })
        this.log.debug("更新交易记录 `{}` ", result)
        return true
    }

    /**
     * 修改交易对象
     * @param id 交易对象ID
     * @returns true
     */
    async removeById(id: string): Promise<boolean> {
        const dbTemplate = cloud.database()
        const res = dbTemplate.collection(PayTradeOrder.TABLE_NAME)
            .where({ _id: id })
            .remove()
        this.log.debug("删除交易 `{}` ", res)
        return true
    }

    private init(obj: PayTradeOrder, flag: string): void {
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