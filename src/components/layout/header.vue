<!--suppress ES6UnusedImports -->
<script setup lang="ts">
import { ref } from 'vue'
import { Expand, CirclePlus, Bell, Avatar } from '@element-plus/icons-vue'
import Aside from '@/components/layout/Aside.vue'
import { useUserStore } from '@/store/user'

const isOpenMenu = ref(false)

function switchOpenMenu() {
    isOpenMenu.value = !isOpenMenu.value
}

const user = useUserStore()

 function exit(){
    localStorage.clear()
    location.reload()
   }
</script>

<template>
<div class="flex w-full h-full items-center">
    <div class="brand w-40 flex items-center justify-start ml-2">
        <img
            src="http://user-assets.sxlcdn.com/images/42894/FvhDgE1TIv5mVA-Y2lzouV5NhhqB.png?imageMogr2/strip/auto-orient/thumbnail/300x300%3E/quality/90!/format/png"
            alt="logo"
            class="w-8 h-8 align-middle"
        />
        <div class="brand-text sm:block ml-2">微草轻课</div>
    </div>
    <div class="menu flex-auto sm:flex justify-end hidden">
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


                <el-sub-menu index="quit">
                <template #title>
                       <el-icon>
                    <avatar />
                </el-icon>
                <span>{{ user.username }}</span>
                </template>
                <el-menu-item @click="exit()" index="exit">
                <el-icon><circle-close /></el-icon>
                退出</el-menu-item>
            </el-sub-menu>




       
        </el-menu>
    </div>
    <div class="menu flex-auto flex justify-end sm:hidden mr-2">
        <el-button plain :icon="Expand" @click="switchOpenMenu"></el-button>
    </div>
    <el-drawer
        modal-class="layout-header-drawer-hack"
        :with-header="false"
        v-model="isOpenMenu"
        size="160px">
        <Aside @select="isOpenMenu = false" />
    </el-drawer>
</div>
</template>

<style lang="less">
.layout-header-drawer-hack .el-drawer .el-drawer__body {
    padding: 0px !important;
}
</style>
