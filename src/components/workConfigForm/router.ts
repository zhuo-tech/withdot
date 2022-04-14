import Layout from '@/components/layout/main.vue'
import { RouteRecordRaw } from 'vue-router'
import { Reading } from '@element-plus/icons-vue'

const RouterConfigItem: RouteRecordRaw = {
    path: '/test',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('./UrlForm.vue'),
            meta: {
                icon: Reading,
                isMenu: true,
                title: '测试Form',
            },
        },
    ],
}
export default RouterConfigItem
