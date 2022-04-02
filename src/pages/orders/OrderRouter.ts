import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'
import { ShoppingBag } from '@element-plus/icons-vue'

const RouterConfigItem: RouteRecordRaw = {
    path: '/order',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('./index.vue'),
            meta: {
                icon: ShoppingBag,
                isMenu: true,
                title: '财务管理',
            },
        },
    ],
}
export default RouterConfigItem
