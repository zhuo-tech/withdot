import AccountRouter from '@/pages/accounts/AccountRouter'
import AlbumsRouter from '@/pages/albums/AlbumsRouter'
import HomeRouter from '@/pages/home/HomeRouter'
import MaterialRouter from '@/pages/materials/MaterialRouter'
import OrderRouter from '@/pages/orders/OrderRouter'
import SettingRouter from '@/pages/settings/SettingRouter'
import UserRouter from '@/pages/users/UserRouter'
import RouterConfigItem from '@/pages/weixin/weixinRouter'
import WorksRouter from '@/pages/works/WorksRouter'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    HomeRouter,
    MaterialRouter,
    WorksRouter,
    AlbumsRouter,
    UserRouter,
    OrderRouter,
    SettingRouter,
    RouterConfigItem,
    ...AccountRouter,
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
