import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import './index.css'  // import tailwind css before element-plus css to avoid conflicts
import 'element-plus/dist/index.css'
import App from './app.vue'
import { router } from './router'

createApp(App)
  .use(router)
  .use(createPinia())
  .use(ElementPlus)
  .mount('#app')
