import App from '@/App'
import { createVueRouterInstantiate } from '@/router'
import { LoggerFactory } from '@/tool/log/LoggerFactory'
import { LoggerLevel } from '@/tool/log/LoggerLevel'
import * as ElIconModules from '@element-plus/icons-vue'
// @ts-ignore
import * as echarts from 'echarts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import { ObjectUtil } from 'typescript-util'
import { createApp } from 'vue'
import './index.css' // 在 element-plus css 之前导入 tailwind css 以避免冲突
// 初始化日志
const factory = new LoggerFactory()
factory.enableLevel = LoggerLevel.DEBUG
export const getLogger = factory.getLogger

// 屏蔽 vite 的重新加载日志
const oldLog = console.log
console.log = (...data: any[]) => {
    if (data && data.length === 1) {
        const first = data[0]
        if (typeof first === 'string' && first.startsWith('[vite]')) {
            return
        }
    }
    oldLog(...data)
}

export const VueApplication = createApp(App)
export const VueRouter = createVueRouterInstantiate()
VueApplication.config.globalProperties.$echarts = echarts

VueApplication
    .use(VueRouter)
    .use(createPinia())
    .use(ElementPlus)
    .mount('#app')

ObjectUtil.toArray(ElIconModules).forEach(({value}) => VueApplication.component(value.name, value))
