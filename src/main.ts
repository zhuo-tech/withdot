import { LoggerFactory } from '@/tool/log/LoggerFactory'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import './index.css'  // 在 element-plus css 之前导入 tailwind css 以避免冲突
import 'element-plus/dist/index.css'
import App from '@/app.vue'
import { router } from '@/router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElIconModules  from '@element-plus/icons-vue'

// 初始化日志
const loggerFactory = new LoggerFactory()
export const getLogger = loggerFactory.getLogger

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


const app = createApp(App)
    .use(ElementPlus, {
        locale: zhCn
    })

Object.keys(ElIconModules).forEach(function(key) {
    app.component(ElIconModules[key].name, ElIconModules[key])
})

createApp(App)
    .use(router)
    .use(createPinia())
    .use(ElementPlus)
    .mount('#app')
