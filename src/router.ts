import { getLogger } from '@/main'
import AccountRouter from '@/pages/accounts/AccountRouter'
import AlbumsRouter from '@/pages/albums/AlbumsRouter'
import ErrorRouter from '@/pages/Error/ErrorRouter'
import HomeRouter from '@/pages/home/HomeRouter'
import MaterialRouter from '@/pages/materials/MaterialRouter'
import OrderRouter from '@/pages/orders/OrderRouter'
import SettingRouter from '@/pages/settings/SettingRouter'
import UserRouter from '@/pages/users/UserRouter'
import WeiXinConfigItem from '@/pages/weixin/weixinRouter'
import WorksRouter from '@/pages/works/WorksRouter'
import { LoggerLevel } from '@/tool/log/LoggerLevel'
import {
    createRouter,
    createWebHashHistory,
    NavigationGuard,
    NavigationGuardNext,
    NavigationGuardWithThis,
    NavigationHookAfter,
    RouteLocationNormalized,
    RouteLocationNormalizedLoaded,
    Router,
    RouteRecordRaw,
} from 'vue-router'

const routes: RouteRecordRaw[] = [
    HomeRouter,
    MaterialRouter,
    WorksRouter,
    AlbumsRouter,
    UserRouter,
    OrderRouter,
    SettingRouter,
    WeiXinConfigItem,
    ...AccountRouter,
    ...ErrorRouter,
]

export function createVueRouterInstantiate(): Router {
    const instantiate = createRouter({
        history: createWebHashHistory(),
        routes,
    })
    const log = getLogger('Router', LoggerLevel.ALL)

    /**
     * 导航之前, 处理登录状态判断
     * @param {RouteLocationNormalized} to 目标路由
     * @param {RouteLocationNormalized} from 来源路由
     * @param {NavigationGuardNext} next 必须调用
     * @return Function 返回一个删除当前导航的函数
     */
    const beforeEach: NavigationGuard = (to, from, next) => {
        log.trace('导航之前: ', from.path, ' => ', to.path)

        next()
    }

    const afterEach: NavigationHookAfter = (to, from) => {
        log.trace('导航完成: ', from.path, ' => ', to.path)
    }

    const beforeResolve: NavigationGuardWithThis<any> = () => {

    }

    instantiate.onError((error: any, to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded): any => {
        log.error('导航错误', from.path, ' => ', to.path, error)
    })

    instantiate.afterEach(afterEach)
    instantiate.beforeEach(beforeEach)
    instantiate.beforeResolve(beforeResolve)

    return instantiate
}

