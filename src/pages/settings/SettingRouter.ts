import Layout from '@/components/layout/main.vue'
import { Phone, Setting } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'
import App from './app.vue'
import Dev from './dev.vue'

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
            component: App,
            meta: {
                icon: Phone,
                isMenu: true,
            },
        },
        {
            path: 'dev',
            name: '开发配置',
            component: Dev,
            meta: {
                icon: Setting,
                isMenu: true,
            },
        },
    ],
}
export default RouterConfigItem
