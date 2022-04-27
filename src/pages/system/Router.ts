import Layout from '@/components/layout/main.vue'
import { UserFilled, Management, Stamp, PriceTag } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

const RouterConfigItem: RouteRecordRaw = {
    path: '/system',
    component: Layout,
    meta: {
        title: '系统管理',
        icon: Management,
    },
    children: [
        {
            path: 'admin',
            component: () => import('./admin/Admin.vue'),
            meta: {
                icon: UserFilled,
                isMenu: true,
                title: '管理账户',
            },
        },
        {
            path: 'rule',
            component: () => import('./rule/Rule.vue'),
            meta: {
                icon: PriceTag,
                isMenu: true,
                title: '系统角色',
            },
        },
        {
            path: 'permission',
            component: () => import('./permission/Permission.vue'),
            meta: {
                icon: Stamp,
                isMenu: true,
                title: '权限标识',
            },
        },

    ],
}
export default RouterConfigItem
