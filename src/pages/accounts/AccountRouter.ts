import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'

const RouterConfigItem: RouteRecordRaw[] = [
    {
        path: '/login',
        component: () => import('./login.vue'),
        meta: {
            isMenu: false,
            title: '登录页',
        },
    },
    {
        path: '/my',
        component: Layout,
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
