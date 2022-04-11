import { cloud } from '@/cloud'
import { getLogger } from '@/main'
import BasisCrud from '@/mixin/BasisCrud'
import { WxAccountFans } from '@/model/entity/WxAccountFans'
import { LogicDelete } from '@/model/LogicDelete'
import { RuleItem } from 'async-validator'
import { Page } from 'laf-db-query-wrapper'

/**
 * 素材管理相关
 */
export default class WxFanService extends BasisCrud<WxAccountFans> {

    public formRule: Partial<Record<keyof WxAccountFans, Array<RuleItem>>> = {
        remark: [{type: 'string', max: 128, min: 1, message: '不能为空, 最多128字符', trigger: 'blur', required: true}],
    }
    // noinspection JSUnusedLocalSymbols
    private log = getLogger(WxFanService.name)
    private DB = cloud.database().collection(WxAccountFans.TABLE_NAME)

    protected get formDataDefault(): WxAccountFans {
        return new WxAccountFans()
    }

    protected pageRequest: (page: Page<WxAccountFans>, query: Partial<WxAccountFans>) => Promise<Page<WxAccountFans>> = async (page, query) => {
        let whereAge: Partial<WxAccountFans> = {
            delFlag: LogicDelete.NORMAL,
        }
        //判断是否有搜索参数
        if (query.nickname) {
            whereAge.nickname = new RegExp(`.*${ query.nickname }.*`)
        }
        if (query.wxAccountName) {
            whereAge.wxAccountName = new RegExp(`.*${ query.wxAccountName }.*`)
        }
        //获取总条数
        const totalRes = await this.DB
            .where(whereAge)
            .count()
        if (!totalRes.ok) {
            throw new Error(totalRes.error)
        }
        const total = totalRes.total
        const res = await this.DB
            .where(whereAge)
            .page({
                current: page.currentPage,
                size: page.pageSize,
            })
            .get()
        return new Page<WxAccountFans>(page.currentPage, page.pageSize, total, res.data as any)
    }

    protected updateRequest: (data: Partial<WxAccountFans>) => Promise<any> = async (data) => {
        data.updateTime = Date.now()
        console.log(data)
        return await this.DB
            .where({
                _id: data._id,
                delFlag: LogicDelete.NORMAL,
            })
            .update({
                remark: data.remark,
            })
    }
    protected deleteByIdRequest: (id: (string | number)) => Promise<any> = async (id) => {
        return await this.DB
            .where({
                delFlag: LogicDelete.NORMAL,
                _id: id,
            })
            .remove()
    }
}
