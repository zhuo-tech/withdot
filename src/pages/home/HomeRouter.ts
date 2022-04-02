import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'
import Component from './index.vue'

const RouterConfigItem: RouteRecordRaw = {
    path: '/',
    component: Layout,
    children: [
        {
            path: '',
            name: '数据看板',
            component: Component,
            meta: {
                icon: import('./index.vue'),
                isMenu: true,
            },
        },
    ],
}
export default RouterConfigItem
