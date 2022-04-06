import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'

export const ROUTER_PATH_HOME = '/'

const RouterConfigItem: RouteRecordRaw = {
    path: ROUTER_PATH_HOME,
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
