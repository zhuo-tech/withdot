<script setup lang="ts">
import { ref } from 'vue'
import { Expand, CirclePlus, Bell, Avatar, Fold } from '@element-plus/icons-vue'
import NavMenu from './menu.vue'
import { useUserStore } from '../../store/user'
import { useSideMenuStore } from '../../store/sideMenu'
const isOpenMenu = ref(false)
function switchOpenMenu() {
  isOpenMenu.value = !isOpenMenu.value
}

const sideMenu = useSideMenuStore()
function switchSideMenu() {
  sideMenu.collapse = !sideMenu.collapse
}

const user = useUserStore()
</script>

<template>
  <div class="flex items-center w-full h-full">
    <div class="flex items-center justify-start w-40 ml-2 brand">
      <img
        src="http://user-assets.sxlcdn.com/images/42894/FvhDgE1TIv5mVA-Y2lzouV5NhhqB.png?imageMogr2/strip/auto-orient/thumbnail/300x300%3E/quality/90!/format/png"
        alt="logo"
        class="w-8 h-8 align-middle"
      />
      <div class="ml-2 brand-text sm:block">微草轻课</div>
    </div>
    <div @click="">
      <el-icon class="cursor-pointer" @click="switchSideMenu"><fold /></el-icon>
    </div>
    <div class="justify-end flex-auto hidden menu sm:flex">
      <el-menu default-active="0" mode="horizontal" :ellipsis="false">
        <el-sub-menu index="create">
          <template #title>
            <el-icon>
              <circle-plus />
            </el-icon>
            <span>新建</span>
          </template>
          <el-menu-item index="create-material">添加素材</el-menu-item>
          <el-menu-item index="create-work">创建作品</el-menu-item>
          <el-menu-item index="create-album">创建专辑</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="message">
          <el-icon>
            <bell />
          </el-icon>
          <span>消息</span>
        </el-menu-item>
        <el-menu-item>
          <el-icon>
            <avatar />
          </el-icon>
          <span>{{ user.username }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="flex justify-end flex-auto mr-2 menu sm:hidden">
      <el-button plain :icon="Expand" @click="switchOpenMenu"></el-button>
    </div>
    <el-drawer
      modal-class="layout-header-drawer-hack"
      :with-header="false"
      v-model="isOpenMenu"
      size="160px"
    >
      <nav-menu @select="isOpenMenu = false" />
    </el-drawer>
  </div>
</template>

<style lang="less">
.layout-header-drawer-hack .el-drawer .el-drawer__body {
  padding: 0px !important;
}
</style>