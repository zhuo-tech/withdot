import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'
import Component from './index.vue'

const RouterConfigItem: RouteRecordRaw = {
    path: '/materials',
    component: Layout,
    children: [
        {
            path: '',
            name: '素材管理',
            component: Component,
        },
    ],
}
export default RouterConfigItem
