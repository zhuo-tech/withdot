<script setup lang="ts">
import { Location, Document, Setting } from '@element-plus/icons-vue'
import NavMenu from './menu.vue'
import TopHeader from './header.vue'
</script>

<template>
  <div class="layout">
    <div class="header border-b-2">
      <top-header />
    </div>
    <div class="main flex">
      <div class="menu w-40 overflow-x-hidden overflow-y-auto">
        <nav-menu />
      </div>
      <div class="page flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 px-1">
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