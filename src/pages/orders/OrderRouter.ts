import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'
import Component from './index.vue'

const RouterConfigItem: RouteRecordRaw = {
    path: '/order',
    component: Layout,
    children: [
        {
            path: '',
            component: Component,
        },
    ],
}
export default RouterConfigItem
