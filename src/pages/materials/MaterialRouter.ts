import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'
import Component from './index.vue'
import { Film } from '@element-plus/icons-vue'

const RouterConfigItem: RouteRecordRaw = {
    path: '/materials',
    component: Layout,
    children: [
        {
            path: '',
            name: '素材管理',
            component: Component,
            meta: {
                icon: Film,
                isMenu: true,
            },
        },
    ],
}
export default RouterConfigItem
