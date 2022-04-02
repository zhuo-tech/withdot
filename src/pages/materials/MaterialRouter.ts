import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'
import { Film } from '@element-plus/icons-vue'

const RouterConfigItem: RouteRecordRaw = {
    path: '/material',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('./index.vue'),
            meta: {
                icon: Film,
                isMenu: true,
                title: '素材管理',
            },
        },
    ],
}
export default RouterConfigItem
