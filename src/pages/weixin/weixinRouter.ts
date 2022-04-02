import Layout from '@/components/layout/main.vue'
import { Menu } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

const RouterConfigItem: RouteRecordRaw = {
    path: '/weixin',
    component: Layout,
    name: '微信管理',
    meta: {
        icon: Menu,
        isMenu: true,
    },
    children: [
        {
            path: '',
            name: '菜单设置',
            component: () => import('./setting/index.vue'),
            meta: {
                icon: Menu,
                isMenu: true,
            },
        },
        {
            path: 'operation',
            name: '运营数据',
            component: () => import('./operation/index.vue'),
            meta: {
                icon: Menu,
                isMenu: true,
            },
        },
        {
            path: 'fan',
            name: '粉丝管理',
            component: () => import('./fan/index.vue'),
            meta: {
                icon: Menu,
                isMenu: true,
            },
        },
        {
            path: 'news',
            name: '消息管理',
            component: () => import('./news/index.vue'),
            meta: {
                icon: Menu,
                isMenu: true,
            },
        },
        {
            path: 'account',
            name: '账号管理',
            component: () => import('./account/index.vue'),
            meta: {
                icon: Menu,
                isMenu: true,
            },
        },
        {
            path: 'automaticResponse',
            name: '自动回复',
            component: () => import('./automaticResponse/index.vue'),
            meta: {
                icon: Menu,
                isMenu: true,
            },
        },
        {
            path: 'material',
            name: '素材管理',
            component: () => import('./material/index.vue'),
            meta: {
                icon: Menu,
                isMenu: true,
            },
        },
        {
            path: 'graphics',
            name: '图文管理',
            component: () => import('./graphics/index.vue'),
            meta: {
                icon: Menu,
                isMenu: true,
            },
        },
    ],
}
export default RouterConfigItem
