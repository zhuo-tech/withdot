import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'

const RouterConfigItem: RouteRecordRaw = {
    path: '/',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('./index.vue'),
            meta: {
                isMenu: true,
                title: '数据看板',
            },
        },
    ],
}
export default RouterConfigItem
