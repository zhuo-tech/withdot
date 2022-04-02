import Layout from '@/components/layout/main.vue'
import { MagicStick } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

const RouterConfigItem: RouteRecordRaw = {
    path: '/works',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('./index.vue'),
            meta: {
                icon: MagicStick,
                isMenu: true,
                title: '作品中心',
            },
        },
    ],
}
export default RouterConfigItem
