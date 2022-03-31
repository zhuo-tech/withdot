import Layout from '@/components/layout/main.vue'
import { User } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'
import Component from './index.vue'

const RouterConfigItem: RouteRecordRaw = {
    path: '/user',
    component: Layout,
    children: [
        {
            path: '',
            name: '学员管理',
            component: Component,
            meta: {
                icon: User,
                isMenu: true,
            },
        },
    ],
}
export default RouterConfigItem
