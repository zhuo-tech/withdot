import { SysAdmin } from '@/model/entity/SysAdmin'
import { SysPermission } from '@/model/entity/SysPermission'
import { SysRole } from '@/model/entity/SysRole'
import { Request } from '@/tool/hooks/useTableList'
import { LafClient, QueryChainWrapper } from 'laf-db-query-wrapper'
import { CollUtil } from 'typescript-util'

const client = new LafClient<SysAdmin>(SysAdmin.TABLE_NAME)

type LabelName = {
    label: string
    name: string
}

export type RolePermission = SysRole & {
    rp: Array<LabelName>
}

export type AdminPermission = SysAdmin & {
    permission: Array<LabelName>
}

export const request: Request<SysAdmin> = {
    page: async (page, query) => {
        const adminPage = await client.queryWrapper()
            .likeNotEmpty('name', query?.name)
            .likeNotEmpty('username', query?.name)
            .inNotEmpty('roles', query.roles)
            .page(page)

        if (CollUtil.isEmpty(adminPage.list)) {
            return adminPage
        }

        const roleList = await new QueryChainWrapper<RolePermission>(SysRole.TABLE_NAME)
            .show('label', 'name', 'permissions')
            .inNotEmpty('name', adminPage.list.flatMap(i => i.roles))
            .list()
        const perList = await new QueryChainWrapper<SysPermission>(SysPermission.TABLE_NAME)
            .show('label', 'name')
            .inNotEmpty('name', roleList.flatMap(i => i.permissions))
            .list(1000)

        roleList.forEach(role => role.rp = perList.filter(per => role.permissions.includes(per.name)))
        adminPage.list.forEach(admin => {
            admin['permission'] = roleList
                .filter(role => admin.roles.includes(role.name))
                .flatMap(i => i.rp)
        })

        return adminPage
    },
    create: (data) => client.insert(data),
    update: (data) => client.updateById(data._id as string, data, '_id'),
    del: (data) => client.deleteById(data._id as string),
}
