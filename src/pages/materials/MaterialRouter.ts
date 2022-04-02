import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'
import { Film } from '@element-plus/icons-vue'

const RouterConfigItem: RouteRecordRaw = {
    path: '/material',
    component: Layout,
    children: [
        {
            path: '',
            name: '素材管理',
            component: () => import('./index.vue'),
            meta: {
                icon: Film,
                isMenu: true,
            },
        },
    ],
}
export default RouterConfigItem
