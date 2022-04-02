import Layout from '@/components/layout/main.vue'
import { User } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

const RouterConfigItem: RouteRecordRaw = {
    path: '/user',
    component: Layout,
    children: [
        {
            path: '',
            name: '学员管理',
            component: import('./index.vue'),
            meta: {
                icon: User,
                isMenu: true,
            },
        },
    ],
}
export default RouterConfigItem
