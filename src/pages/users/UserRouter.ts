import Layout from '@/components/layout/main.vue'
import { User } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

const RouterConfigItem: RouteRecordRaw = {
    path: '/user',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('./index.vue'),
            meta: {
                icon: User,
                isMenu: true,
                title: '学员管理',
            },
        },
    ],
}
export default RouterConfigItem
