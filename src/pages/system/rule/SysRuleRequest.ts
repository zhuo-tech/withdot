import { SysPermission } from '@/model/entity/SysPermission'
import { SysRole } from '@/model/entity/SysRole'
import { Request } from '@/tool/hooks/useTableList'
import { distinct } from '@/utils/utils'
import { LafClient, QueryChainWrapper } from 'laf-db-query-wrapper'
import { CollUtil } from 'typescript-util'

const client = new LafClient<SysRole>(SysRole.TABLE_NAME)
const perClient = new LafClient<SysPermission>(SysPermission.TABLE_NAME)

interface RuleRequest extends Request<SysRole> {
    getAllPerList(): Promise<Array<{ key: string, label: string }>>
}

export const request: RuleRequest = {
    page: async (page, query) => {
        const rolePage = await client.queryWrapper()
            .likeNotEmpty('name', query?.name)
            .page(page)
        const list = rolePage.list
        if (CollUtil.isEmpty(list)) {
            return rolePage
        }
        const perList = await perClient.queryWrapper()
            .show('name', 'label')
            .inNotEmpty('name', distinct(list.flatMap(i => i.permissions)))
            .list(1000)
        list.forEach(rule => rule['permission'] = perList.filter(per => rule.permissions.includes(per.name)))

        return rolePage
    },
    create: async (data) => {
        data.createTime = Date.now()
        data.updateTime = Date.now()
        return await client.insert(data)
    },
    update: async (data) => {
        data.updateTime = Date.now()
        return await client.updateById(data._id as string, data, '_id')
    },
    del: (data) => client.deleteById(data._id as string),

    async getAllPerList(): Promise<Array<{ key: string, label: string }>> {
        return (await perClient.queryWrapper()
            .show('name', 'label')
            .list(1000))
            .map(({name, label}) => ({key: name, label}))
    },
}
