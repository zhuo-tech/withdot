import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'
import App from './app.vue'
import Dev from './dev.vue'

const RouterConfigItem: RouteRecordRaw = {
    path: '/setting',
    component: Layout,
    children: [
        {
            path: '/app',
            component: App,
        },
        {
            path: '/dev',
            component: Dev,
        },
    ],
}
export default RouterConfigItem
