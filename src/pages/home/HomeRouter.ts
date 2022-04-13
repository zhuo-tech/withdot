import Layout from '@/components/layout/main.vue'
import { Histogram } from '@element-plus/icons-vue'
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
                icon: Histogram,
                title: '数据看板'
            },
        },
    ],
}
export default RouterConfigItem
