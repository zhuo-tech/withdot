import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'
import { Reading } from '@element-plus/icons-vue'

const RouterConfigItem: RouteRecordRaw = {
    path: '/question',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('./index.vue'),
            meta: {
                icon: Reading,
                isMenu: true,
                title: '题库管理',
            },
        },
    ],
}
export default RouterConfigItem
