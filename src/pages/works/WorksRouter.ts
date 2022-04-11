import Layout from '@/components/layout/main.vue'
import { MagicStick } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

const RouterConfigItem: RouteRecordRaw = {
    path: '/works',
    component: Layout,
    meta: {
        title: '作品中心',
    },
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
        {
            path: 'editor/:id',
            component: () => import('./WorkEditorPage.vue'),
            meta: {
                icon: MagicStick,
                isMenu: false,
                title: '编辑作品',
            },
        },
    ],
}
export default RouterConfigItem
