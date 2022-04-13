import { cloud } from '@/cloud';
import { getLogger } from '@/main';
import { CommonEnum } from '@/model/CommonEnum';
import { PayChannel } from "@/model/entity/PayChannel"
import { LogicDelete } from '@/model/LogicDelete';
import { ObjectUtil } from 'typescript-util';

/**
 * 支付渠道
 */
export class PayChannelService {

    private readonly log = getLogger('PayChannelService')

    /**
     * 列表查询支付渠道信息
     * @returns 支付渠道列表
     */
    async list(): Promise<Array<PayChannel>> {
        const dbTemplate = cloud.database();
        const res = await dbTemplate.collection(PayChannel.TABLE_NAME)
            .get<PayChannel>()
        return res.data
    }


    /**
     * 分页查询支付渠道信息
     * @param size  偏移量
     * @param current 分页大小
     * @returns 支付渠道分页列表
     */
    async page(size: number, current: number): Promise<Array<PayChannel>> {
        const dbTemplate = cloud.database();
        const res = await dbTemplate.collection(PayChannel.TABLE_NAME)
            .skip(size * (current - 1))
            .limit(size)
            .get<PayChannel>()
        return res.data
    }

    /**
     * 统计
     * @returns 总记录数
     */
    async count(): Promise<number> {
        const dbTemplate = cloud.database();
        const { total } = await dbTemplate.collection(PayChannel.TABLE_NAME).count()
        return total
    }

    /**
     * 保存支付渠道
     * @param obj 支付渠道对象
     * @returns true | false
     */
    async saveObj(obj: PayChannel): Promise<string> {
        const dbTemplate = cloud.database();
        this.init(obj, CommonEnum.ACTION_ADD)
        const { id, error } = await dbTemplate.collection(PayChannel.TABLE_NAME).add({ obj })
        if (ObjectUtil.isNull(id)) {
            this.log.error("save exam error `{}` ", error)
            throw new Error(error)
        }
        return id as string
    }

    /**
     * 修改支付渠道对象
     * @param obj 支付渠道对象
     * @returns true | false
     */
    async updateById(obj: PayChannel): Promise<boolean> {
        const dbTemplate = cloud.database();
        this.init(obj, CommonEnum.ACTION_UPDATE)
        const result = await dbTemplate
            .collection(PayChannel.TABLE_NAME)
            .doc(obj._id)
            .update({ obj })
        this.log.debug("更新支付渠道记录 `{}` ", result)
        return true
    }

    /**
     * 删除支付渠道
     * @param id 主键
     * @returns true
     */
    async removeById(id: string): Promise<boolean> {
        const dbTemplate = cloud.database()
        const res = dbTemplate.collection(PayChannel.TABLE_NAME)
            .where({ _id: id })
            .remove()
        this.log.debug("删除支付渠道 `{}`", res)
        return true
    }

    private init(obj: PayChannel, flag: string): void {
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