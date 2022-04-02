import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'
import { Files } from '@element-plus/icons-vue'

const RouterConfigItem: RouteRecordRaw = {
    path: '/albums',
    component: Layout,
    children: [
        {
            path: '',
            name: '专辑管理',
            component: import('./index.vue'),
            meta: {
                icon: Files,
                isMenu: true,
            },
        },
    ],
}
export default RouterConfigItem
