import { getUserInfo } from '@/api/token'
import { getLogger } from '@/main'
import BasisCrud from '@/mixin/BasisCrud'
import { WxAccount } from '@/model/entity/WxAccount'
import { RuleItem } from 'async-validator'
import { LafClient, Page } from 'laf-db-query-wrapper'

/**
 * 素材管理相关
 */
export default class WxAccountService extends BasisCrud<WxAccount> {

    // noinspection JSUnusedLocalSymbols
    private log = getLogger(WxAccountService.name)
    private client = new LafClient<WxAccount>(WxAccount.TABLE_NAME)

    public formRule: Partial<Record<keyof WxAccount, Array<RuleItem>>> = {
        name: [{type: 'string', max: 128, min: 1, message: '不能为空, 最多128字符', trigger: 'blur', required: true}],
        account: [{type: 'string', max: 128, min: 1, message: '不能为空, 最多128字符', trigger: 'blur', required: true}],
        appid: [{type: 'string', max: 128, min: 1, message: '不能为空, 最多128字符', trigger: 'blur', required: true}],
        appSecret: [{type: 'string', max: 128, min: 1, message: '不能为空, 最多128字符', trigger: 'blur', required: true}],
        url: [{type: 'string', max: 128, min: 1, message: '不能为空, 最多128字符', trigger: 'blur', required: true}],
        token: [{type: 'string', max: 128, min: 1, message: '不能为空, 最多128字符', trigger: 'blur', required: true}],
        aesKey: [{type: 'string', max: 128, min: 1, message: '不能为空, 最多128字符', trigger: 'blur', required: true}],
    }

    protected get formDataDefault(): WxAccount {
        return new WxAccount()
    }

    protected pageRequest: (page: Page<WxAccount>, query: Partial<WxAccount>) => Promise<Page<WxAccount>> = async (page, query) => {
        return await this.client.queryWrapper()
            .likeNotEmpty('name', query?.name)
            .likeNotEmpty('account', query?.account)
            .likeNotEmpty('appid', query?.appid)
            .likeNotEmpty('appSecret', query?.appSecret)
            .likeNotEmpty('token', query?.token)
            .likeNotEmpty('aesKey', query?.aesKey)
            .orderByDesc('createTime')
            .page(page)
    }
    protected createRequest: (data: Partial<WxAccount>) => Promise<any> = async (data) => {
        data.createTime = Date.now()
        data.updateTime = Date.now()

        return await this.client.insert(data)
    }

    private async getCurrentUid() {
        return (await getUserInfo())?._id
    }

    protected updateRequest: (data: Partial<WxAccount>) => Promise<any> = async (data) => {
        data.updateTime = Date.now()

        return await this.client.updateById(data._id as string, data, '_id')
    }
    protected deleteByIdRequest: (id: (string | number)) => Promise<any> = async (id) => {
        return await this.client.deleteById(id)
    }
}
