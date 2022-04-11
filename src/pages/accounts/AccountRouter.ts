import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'

export const ROUTER_PATH_LOGIN = '/login'

const RouterConfigItem: RouteRecordRaw[] = [
    {
        path: ROUTER_PATH_LOGIN,
        component: () => import('./login.vue'),
        meta: {
            isMenu: false,
            title: '登录页',
        },
    },
    {
        path: '/my',
        component: Layout,
        meta: {
            isMenu: false,
        },
        children: [
            {
                path: 'profile',
                component: () => import('./profile.vue'),
                meta: {
                    isMenu: false,
                    title: '用户详情',
                },
            },
        ],
    },
]
export default RouterConfigItem
