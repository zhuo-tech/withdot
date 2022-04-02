import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'
import Component from './index.vue'
import { ShoppingBag } from '@element-plus/icons-vue'

const RouterConfigItem: RouteRecordRaw = {
    path: '/order',
    component: Layout,
    children: [
        {
            path: '',
            name: '财务管理',
            component: Component,
            meta: {
                icon: ShoppingBag,
                isMenu: true,
            },
        },
    ],
}
export default RouterConfigItem
