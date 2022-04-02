import Layout from '@/components/layout/main.vue'
import { MagicStick } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

const RouterConfigItem: RouteRecordRaw = {
    path: '/works',
    component: Layout,
    children: [
        {
            path: '',
            name: '作品中心',
            component: () => import('./index.vue'),
            meta: {
                icon: MagicStick,
                isMenu: true,
            },
        },
    ],
}
export default RouterConfigItem
