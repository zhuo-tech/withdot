import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'
import Component from './index.vue'
import { Compass } from '@element-plus/icons-vue'

const RouterConfigItem: RouteRecordRaw = {
    path: '/',
    component: Layout,
    children: [
        {
            path: '',
            name: '数据看板',
            component: Component,
            meta: {
                icon: Compass,
                isMenu: true,
            },
        },
    ],
}
export default RouterConfigItem
