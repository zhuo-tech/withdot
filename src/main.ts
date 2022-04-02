import { LoggerFactory } from '@/tool/log/LoggerFactory'
import { ObjectUtil } from 'typescript-util'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import './index.css'  // 在 element-plus css 之前导入 tailwind css 以避免冲突
import 'element-plus/dist/index.css'
import App from '@/App'
import { router } from '@/router'
import * as ElIconModules from '@element-plus/icons-vue'

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

app.use(router)
    .use(createPinia())
    .use(ElementPlus)
    .mount('#app')

ObjectUtil.toArray(ElIconModules).forEach(kv => app.component(kv.value.name, kv.value))
