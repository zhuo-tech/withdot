
import { cloud } from '@/cloud';
import { CommonEnum } from '@/model/CommonEnum';
import { PayChannel } from "@/model/entity/PayChannel"
import { LogicDelete } from '@/model/LogicDelete';
import { ObjectUtil } from 'typescript-util';
import { PayChannelQo } from '@/pages/pay/channel/PayChannelQo'
import { getLogger } from "@/main";
import { BaseMo } from '@/model/BaseMo';
import { PayChannelDo } from '@/pages/pay/channel/PayChannelDo';
import { filterTime } from '@/utils/utils';

/**
 * 支付渠道
 * @author HK
 * @date 2022年04月01日 17点13分
 */
export class PayChannelService {

    private readonly log = getLogger('PayChannelService')

    /**
     * 分页查询支付渠道信息
     * @param q  查询参数
     * @returns 支付渠道分页列表
     */
    async page(q: PayChannelQo): Promise<BaseMo<PayChannel>> {
        const dbTemplate = cloud.database();
        const { current, size, channelId, channelMchId } = q
        const p = { delFlag: LogicDelete.NORMAL }
        if (channelId) {
            p['channelId'] = channelId
        }
        if (channelMchId) {
            p['channelMchId'] = channelMchId
        }
        const res = await dbTemplate.collection(PayChannel.TABLE_NAME)
            .where(p)
            .skip(size * (current - 1))
            .limit(size)
            .get<PayChannel>()
        const { total } = await dbTemplate.collection(PayChannel.TABLE_NAME)
            .where(p)
            .count()
        return {
            total,
            record: res.data
        };
    }

    /**
     * 根据ID获取支付渠道详情信息
     * @param id 主键
     * @returns 支付渠道详情信息
     */
    async getById(id: string): Promise<PayChannelDo> {
        const dbTemplate = cloud.database();
        const { data } = await dbTemplate
            .collection(PayChannel.TABLE_NAME)
            .where({ _id: id, delFlag: LogicDelete.NORMAL })
            .getOne<PayChannel>()
        let detail = new PayChannelDo()
        detail = Object.assign(detail, data)
        detail.keyPath = detail.param.keyPath
        detail.keyPem = detail.param.keyPem
        detail.certPem = detail.param.certPem
        detail.secret = detail.param.secret
        detail.partnerKey = detail.param.partnerKey
        return detail
    }

    /**
     * 添加支付渠道
     * @param obj 支付渠道对象
     * @returns true | false
     */
    async saveObj(obj: PayChannelDo): Promise<string> {
        const doc = this.copy(obj)
        this.init(doc, CommonEnum.ACTION_ADD);
        this.log.debug(`save doc -> ${JSON.stringify(doc)}`);
        const dbTemplate = cloud.database();
        const { id, error } = await dbTemplate
            .collection(PayChannel.TABLE_NAME)
            .add(doc);
        if (ObjectUtil.isNull(id)) {
            this.log.error(`save exam error ${error}`);
            throw new Error(error);
        }
        return id as string;
    }

    /**
     * 修改支付渠道
     * @param obj 支付渠道对象
     * @returns true | false
     */
    async updateById(obj: PayChannelDo): Promise<boolean> {
        const tmp = this.copy(obj)
        this.init(tmp, CommonEnum.ACTION_UPDATE);
        let { _id, ...doc } = tmp
        this.log.debug(`修改支付渠道 doc -> ${JSON.stringify(doc)}`);
        const dbTemplate = cloud.database();
        const result = await dbTemplate
            .collection(PayChannel.TABLE_NAME)
            .doc(obj._id)
            .update(doc);
        this.log.debug(`更新支付渠道 ${result}`);
        return true;
    }

    /**
     * 删除支付渠道
     * @param id 主键
     * @returns true
     */
    async removeById(id: string): Promise<boolean> {
        const dbTemplate = cloud.database();
        const res = dbTemplate
            .collection(PayChannel.TABLE_NAME)
            .doc(id)
            .update({ delFlag: LogicDelete.DELETED })
        this.log.debug(`删除支付渠道 ${res}`);
        return true;
    }

    /**
     * 拷贝
     * @param src 原始
     * @returns 
     */
    private copy(src: PayChannelDo): PayChannel {
        const { keyPath, keyPem, certPem, secret, partnerKey } = src
        const param = { keyPath, keyPem, certPem, secret, partnerKey }
        let doc = new PayChannel();
        doc.mchId = src.channelMchId
        doc.channelId = src.channelId
        doc.channelName = src.channelName
        doc.channelMchId = src.channelMchId
        doc.returnUrl = src.returnUrl
        doc.notifyUrl = src.notifyUrl
        doc.state = src.state
        doc.param = param
        doc.appId = src.appId
        doc.remark = src.remark
        return doc
    }

    private init(obj: PayChannel, flag: string): void {
        const curTime = filterTime(Date.now());
        if (CommonEnum.ACTION_ADD === flag) {
            obj.createTime = curTime;
            obj.updateTime = curTime;
            obj.delFlag = LogicDelete.NORMAL;
        } else {
            obj.updateTime = curTime;
        }
    }
}
