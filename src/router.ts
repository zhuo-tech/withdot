import AccountRouter from '@/pages/accounts/AccountRouter'
import AlbumsRouter from '@/pages/albums/AlbumsRouter'
import HomeRouter from '@/pages/home/HomeRouter'
import MaterialRouter from '@/pages/materials/MaterialRouter'
import OrderRouter from '@/pages/orders/OrderRouter'
import SettingRouter from '@/pages/settings/SettingRouter'
import UserRouter from '@/pages/users/UserRouter'
import WorksRouter from '@/pages/works/WorksRouter'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    ...AccountRouter,
    AlbumsRouter,
    HomeRouter,
    MaterialRouter,
    OrderRouter,
    SettingRouter,
    UserRouter,
    WorksRouter,
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
