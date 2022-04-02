import Layout from '@/components/layout/main.vue'
import { Phone, Setting } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

const RouterConfigItem: RouteRecordRaw = {
    path: '/setting',
    component: Layout,
    meta: {
        flatChildren: true,
    },
    children: [
        {
            path: 'app',
            name: '应用设置',
            component: () => import('./app.vue'),
            meta: {
                icon: Phone,
                isMenu: true,
            },
        },
        {
            path: 'dev',
            name: '开发配置',
            component: () => import('./dev.vue'),
            meta: {
                icon: Setting,
                isMenu: true,
            },
        },
    ],
}
export default RouterConfigItem
