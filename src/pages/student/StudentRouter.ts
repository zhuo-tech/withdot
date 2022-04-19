import Layout from '@/components/layout/main.vue'
import { User } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

const RouterConfigItem: RouteRecordRaw = {
    path: '/student',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('./index.vue'),
            meta: {
                icon: User,
                isMenu: true,
                title: '学员管理',
            },
        },
        // {
        //     path: 'detail',
        //     component: () => import('src/pages/student/components/detail.vue'),
        //     meta: {
        //         isMenu: false,
        //         title: '专辑编辑',
        //     },
        // },
    ],
}
export default RouterConfigItem
