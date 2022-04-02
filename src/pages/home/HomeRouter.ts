import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'
import Component from './index.vue'

const RouterConfigItem: RouteRecordRaw = {
    path: '/',
    component: Layout,
    children: [
        {
            path: '',
            component: Component,
            meta: {
                icon: import('./index.vue'),
                isMenu: true,
                title: '数据看板',
            },
        },
    ],
}
export default RouterConfigItem
