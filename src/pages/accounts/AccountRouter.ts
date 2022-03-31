import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'
import Component from './login.vue'
import MyProfile from './profile.vue'

const RouterConfigItem: RouteRecordRaw[] = [
    {
        path: '/login',
        component: Component,
    },
    {
        path: '/my',
        component: Layout,
        children: [
            {
                path: 'profile',
                component: MyProfile,
                meta: {

                }
            },
        ],
    },
]
export default RouterConfigItem
