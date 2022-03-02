import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomePage from './pages/home/index.vue'

const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    component: HomePage
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})