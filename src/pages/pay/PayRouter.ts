import Layout from '@/components/layout/main.vue'
import { ChatRound, Cloudy, Coin, Goods, Money } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

const RouterConfigItem: RouteRecordRaw = {
    path: '/pay',
    component: Layout,
    meta: {
        icon: Money,
        isMenu: true,
        title: '支付管理',
    },
    children: [
        {
            path: 'channel',
            component: () => import('@/pages/pay/channel/index.vue'),
            meta: {
                icon: Cloudy,
                isMenu: true,
                title: '支付渠道',
            }
        },
        {
            path: 'channel/addPayChannel',
            component: () => import('@/pages/pay/channel/component/add.vue'),
            meta: {
                isMenu: false,
                title: '新增支付渠道'
            }
        },
        {
            path: 'channel/editPayChannel',
            component: () => import('@/pages/pay/channel/component/edit.vue'),
            meta: {
                isMenu: false,
                title: '编辑支付渠道'
            }
        },
        {
            path: 'goods',
            component: () => import('@/pages/pay/goods/index.vue'),
            meta: {
                icon: Goods,
                isMenu: true,
                title: '商品订单',
            }
        },
        {
            path: 'order',
            component: () => import('@/pages/pay/order/index.vue'),
            meta: {
                icon: Coin,
                isMenu: true,
                title: '交易订单',
            }
        },
        {
            path: 'notify',
            component: () => import('@/pages/pay/notify/index.vue'),
            meta: {
                icon: ChatRound,
                isMenu: true,
                title: '支付通知',
            }
        },
    ]
}
export default RouterConfigItem
