import { SysAdmin } from '@/model/entity/SysAdmin'
import { SysRole } from '@/model/entity/SysRole'
import { Request } from '@/tool/hooks/useTableList'
import { LafClient } from 'laf-db-query-wrapper'

const client = new LafClient<SysRole>(SysAdmin.TABLE_NAME)

interface AdminRequest extends Request<SysRole> {
}

export const request: AdminRequest = {
    page: async (page, query) => {
        return await client.queryWrapper()
            .likeNotEmpty('name', query?.name)
            .page(page)
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
}
