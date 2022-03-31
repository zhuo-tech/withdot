import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'
import Component from './index.vue'

const RouterConfigItem: RouteRecordRaw = {
    path: '/albums',
    component: Layout,
    children: [
        {
            path: '',
            name: 'albums',
            component: Component,
        },
    ],
}
export default RouterConfigItem
