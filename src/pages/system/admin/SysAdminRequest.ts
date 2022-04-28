import { SysAdmin } from '@/model/entity/SysAdmin'
import { SysPermission } from '@/model/entity/SysPermission'
import { SysRole } from '@/model/entity/SysRole'
import { Request } from '@/tool/hooks/useTableList'
import { distinct } from '@/utils/utils'
import { LafClient, QueryChainWrapper } from 'laf-db-query-wrapper'
import { CollUtil } from 'typescript-util'

const client = new LafClient<SysAdmin>(SysAdmin.TABLE_NAME)

type LabelName = {
    label: string
    name: string
}

interface AdminRequest extends Request<SysAdmin> {
    getAllRole(): Promise<Array<SysRole>>
}

export type RolePermission = SysRole & {
    rp: Array<LabelName>
}

export type AdminPermission = SysAdmin & {
    permission: Array<LabelName>
}

export const request: AdminRequest = {
    page: async (page, query) => {
        const adminPage = await client.queryWrapper()
            .likeNotEmpty('name', query?.name)
            .likeNotEmpty('username', query?.name)
            .inNotEmpty('roles', query.roles)
            .page(page)

        if (CollUtil.isEmpty(adminPage.list)) {
            return adminPage
        }

        const roleNames = adminPage.list.flatMap(i => i.roles)
        const roleList = await new QueryChainWrapper<RolePermission>(SysRole.TABLE_NAME)
            .show('label', 'name', 'permissions')
            .inNotEmpty('name', distinct(roleNames))
            .list()
        let perNames = roleList.flatMap(i => i.permissions)
        const perList = await new QueryChainWrapper<SysPermission>(SysPermission.TABLE_NAME)
            .show('label', 'name')
            .inNotEmpty('name', distinct(perNames))
            .list(1000)

        roleList.forEach(role => role.rp = perList.filter(per => role.permissions.includes(per.name)))
        adminPage.list.forEach(admin => {
            admin['permission'] = roleList
                .filter(role => admin.roles.includes(role.name))
                .flatMap(i => i.rp)
        })

        return adminPage
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

    getAllRole() {
        return new QueryChainWrapper<SysRole>(SysRole.TABLE_NAME)
            .show('label', 'name')
            .list(1000)
    },
}
