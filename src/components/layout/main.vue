<script setup lang="ts">
import { Location, Document, Setting } from '@element-plus/icons-vue'
import NavMenu from './menu.vue'
import TopHeader from './header.vue'
import { ref } from 'vue'
import { useSideMenuStore } from '../../store/sideMenu'

const sideMenu = useSideMenuStore()
window.addEventListener('resize', (ev) => {
    const clientWidth = document.documentElement.clientWidth || document.body.clientWidth
    sideMenu.collapse = clientWidth < 1024
})
</script>

<template>
  <div class="layout">
    <div class="border-b-2 header">
      <top-header />
    </div>
    <div class="flex main">
      <div class="hidden overflow-x-hidden overflow-y-auto menu sm:block">
        <nav-menu />
      </div>
      <div class="flex-1 p-2 overflow-x-hidden overflow-y-auto page bg-slate-50 sm:p-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.layout {
  height: 100vh;

  .header {
    height: 60px;
  }

  .main {
    height: calc(100vh - 60px);
  }
}
</style>