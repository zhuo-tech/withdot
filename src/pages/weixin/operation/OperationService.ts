import { cloud } from '@/cloud'
import { WxAccount } from '@/model/entity/WxAccount'
import OperationApi from '@/pages/weixin/operation/OperationApi'

export default class OperationService extends OperationApi {
    private DB = cloud.database()

    /**
     * 左侧公众号搜索
     * @param {Partial<WxAccount>} query:string 模糊查询参数
     * @returns {Promise<GetRes<any>>}
     * @protected
     */
    protected publicRequest = async (query: string) => {
        let whereAge: any = {}
        if (query) {
            whereAge.name = new RegExp(`.*${ query }.*`)
        }
        return await this.DB.collection(WxAccount.TABLE_NAME)
            .where(whereAge)
            .get()
    }

}
