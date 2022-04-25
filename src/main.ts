import { LoggerFactory } from '@/tool/log/LoggerFactory'
import { LoggerLevel } from '@/tool/log/LoggerLevel'
import { ObjectUtil } from 'typescript-util'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
// 在 element-plus css 之前导入 tailwind css 以避免冲突
import './index.css'
import 'element-plus/dist/index.css'
import App from '@/App'
import { createVueRouterInstantiate } from '@/router'
import * as ElIconModules from '@element-plus/icons-vue'
// @ts-ignore
import * as echarts from 'echarts'

// 初始化日志
const factory = new LoggerFactory()
factory.enableLevel = LoggerLevel.DEBUG
export const getLogger = factory.getLogger

export const app = createApp(App)
export const VueRouter = createVueRouterInstantiate()
app.config.globalProperties.$echarts = echarts

app.use(VueRouter)
    .use(createPinia())
    .use(ElementPlus)
    .mount('#app')

ObjectUtil.toArray(ElIconModules).forEach(({value}) => app.component(value.name, value))
