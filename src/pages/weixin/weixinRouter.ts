import Layout from '@/components/layout/main.vue'
import { ChatRound, Cloudy, FolderOpened, Fries, Headset, PictureFilled, Place, Tools, TrendCharts } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

const RouterConfigItem: RouteRecordRaw = {
    path: '/weixin',
    component: Layout,
    redirect: '/weixin/setting',
    meta: {
        icon: ChatRound,
        isMenu: true,
        title: '微信管理',
    },
    children: [
        {
            path: 'setting',
            component: () => import('./setting/index.vue'),
            meta: {
                icon: Tools,
                isMenu: true,
                title: '菜单设置',
            },
        },
        {
            path: 'operation',
            component: () => import('./operation/index.vue'),
            meta: {
                icon: TrendCharts,
                isMenu: true,
                title: '运营数据',
            },
        },
        {
            path: 'fan',
            component: () => import('./fan/index.vue'),
            meta: {
                icon: Fries,
                isMenu: true,
                title: '粉丝管理',
            },
        },
        {
            path: 'news',
            component: () => import('./news/index.vue'),
            meta: {
                icon: Cloudy,
                isMenu: true,
                title: '消息管理',
            },
        },
        {
            path: 'account',
            component: () => import('./account/index.vue'),
            meta: {
                icon: Place,
                isMenu: true,
                title: '账号管理',
            },
        },
        {
            path: 'automaticResponse',
            component: () => import('./automaticResponse/index.vue'),
            meta: {
                icon: Headset,
                isMenu: true,
                title: '自动回复',
            },
        },
        {
            path: 'material',
            component: () => import('./material/index.vue'),
            meta: {
                icon: FolderOpened,
                isMenu: true,
                title: '素材管理',
            },
        },
        {
            path: 'graphics',
            component: () => import('./graphics/index.vue'),
            meta: {
                icon: PictureFilled,
                isMenu: true,
                title: '图文管理',
            },
        },
    ],
}
export default RouterConfigItem
