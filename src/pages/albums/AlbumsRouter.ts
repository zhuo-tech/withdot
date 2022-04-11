import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'
import { Files } from '@element-plus/icons-vue'

const RouterConfigItem: RouteRecordRaw = {
    path: '/albums',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('./index.vue'),
            meta: {
                icon: Files,
                isMenu: true,
                title: '专辑管理',
            },
        },
        {
            path: 'edit',
            component: () => import('./edit.vue'),
            meta: {
                isMenu: false,
                title: '专辑编辑',
            },
        },
    ],
}
export default RouterConfigItem
