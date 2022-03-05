import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomePage from './pages/home/index.vue'
import Materials from './pages/materials/index.vue'
import Works from './pages/works/index.vue'
import Albums from './pages/albums/index.vue'
import Users from './pages/users/index.vue'
import Orders from './pages/orders/index.vue'
import AppSettings from './pages/settings/app.vue'
import DevSettings from './pages/settings/dev.vue'
import MyProfile from './pages/accounts/profile.vue'

const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    component: HomePage
  },
  {
    path: '/materials',
    component: Materials
  },
  {
    path: '/works',
    component: Works
  },
  {
    path: '/albums',
    component: Albums
  },
  {
    path: '/users',
    component: Users
  },
  {
    path: '/orders',
    component: Orders
  },
  {
    path: '/settings/app',
    component: AppSettings
  },
  {
    path: '/settings/dev',
    component: DevSettings
  },
  {
    path: '/my/profile',
    component: MyProfile
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})