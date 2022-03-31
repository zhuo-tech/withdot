import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'
import Component from './index.vue'

const RouterConfigItem: RouteRecordRaw = {
    path: '/works',
    component: Layout,
    children: [
        {
            path: '',
            name: 'works',
            component: Component,
        },
    ],
}
export default RouterConfigItem
