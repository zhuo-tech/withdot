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
            component: () => import('./app.vue'),
            meta: {
                icon: Phone,
                isMenu: true,
                title: '应用设置',
            },
        },
        {
            path: 'dev',
            component: () => import('./dev.vue'),
            meta: {
                icon: Setting,
                isMenu: true,
                title: '开发配置',
            },
        },
    ],
}
export default RouterConfigItem
