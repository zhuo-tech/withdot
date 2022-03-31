import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'
import Component from './login.vue'
import MyProfile from './profile.vue'

const RouterConfigItem: RouteRecordRaw[] = [
    {
        path: '/login',
        name: '登录页',
        component: Component,
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
                component: MyProfile,
                meta: {
                    isMenu: false,
                },
            },
        ],
    },
]
export default RouterConfigItem
