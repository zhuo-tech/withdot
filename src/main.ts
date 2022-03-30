import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import './index.css'  // 在 element-plus css 之前导入 tailwind css 以避免冲突
import 'element-plus/dist/index.css'
import App from './app.vue'
import { router } from './router'

createApp(App)
    .use(router)
    .use(createPinia())
    .use(ElementPlus)
    .mount('#app')
