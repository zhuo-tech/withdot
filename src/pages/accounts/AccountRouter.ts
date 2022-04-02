import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'

const RouterConfigItem: RouteRecordRaw[] = [
    {
        path: '/login',
        name: '登录页',
        component: () => import('./login.vue'),
        meta: {
            isMenu: false,
        },
    },
    {
        path: '/my',
        component: Layout,
        children: [
            {
                path: 'profile',
                name: '用户详情',
                component: () => import('./profile.vue'),
                meta: {
                    isMenu: false,
                },
            },
        ],
    },
]
export default RouterConfigItem
