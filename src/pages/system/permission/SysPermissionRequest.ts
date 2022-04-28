import { SysPermission } from '@/model/entity/SysPermission'
import { Request } from '@/tool/hooks/useTableList'
import { LafClient } from 'laf-db-query-wrapper'

const client = new LafClient<SysPermission>(SysPermission.TABLE_NAME)

export const request: Request<SysPermission> = {
    page: (page, query) =>
        client.queryWrapper()
            .likeNotEmpty('name', query?.name)
            .likeNotEmpty('label', query?.name)
            .page(page)
    ,
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
}
