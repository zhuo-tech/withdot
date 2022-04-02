import { RouteRecordRaw } from 'vue-router'

const RouterConfigItem: RouteRecordRaw[] = [
    {
        path: '/:pathMatch(.*)*',
        component: () => import('./ErrorPage'),
        meta: {
            isMenu: false,
            title: '错误页',
        },
    },
]
export default RouterConfigItem
