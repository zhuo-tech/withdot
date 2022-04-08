import Layout from '@/components/layout/main.vue'
import { ChatRound, Cloudy, Coin, Goods, Money } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

const RouterConfigItem: RouteRecordRaw = {
    path: '/pay',
    component: Layout,
    redirect: '/pay/channel',
    meta: {
        icon: Money,
        isMenu: true,
        title: '支付管理',
    },
    children: [
        {
            path: 'channel',
            component: () => import('./channel/index.vue'),
            meta: {
                icon: Cloudy,
                isMenu: true,
                title: '支付渠道',
            }
        },
        {
            path: 'goods',
            component: () => import('./goods/index.vue'),
            meta: {
                icon: Goods,
                isMenu: true,
                title: '商品订单',
            }
        },
        {
            path: 'order',
            component: () => import('./order/index.vue'),
            meta: {
                icon: Coin,
                isMenu: true,
                title: '交易订单',
            }
        },
        {
            path: 'notify',
            component: () => import('./notify/index.vue'),
            meta: {
                icon: ChatRound,
                isMenu: true,
                title: '支付通知',
            }
        },
    ]
}
export default RouterConfigItem
