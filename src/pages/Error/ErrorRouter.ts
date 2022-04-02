import { RouteRecordRaw } from 'vue-router'

const RouterConfigItem: RouteRecordRaw[] = [
    {
        path: '/:pathMatch(.*)*',
        name: '错误页',
        component: () => import('./ErrorPage'),
        meta: {
            isMenu: false,
        },
    },
]
export default RouterConfigItem
