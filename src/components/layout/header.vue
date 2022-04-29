<!--suppress ES6UnusedImports -->
<script lang="ts" setup>
import Aside from '@/components/layout/Aside.vue'
import { FileService, INJECT_KEY_FILE_SERVICE } from '@/service/FileService'
import { useUserStore } from '@/store/user'
import { Avatar, Bell, CirclePlus, Expand } from '@element-plus/icons-vue'
import { inject, ref } from 'vue'

const fileService: FileService = inject(INJECT_KEY_FILE_SERVICE) as FileService

const isOpenMenu = ref(false)

function switchOpenMenu() {
    isOpenMenu.value = !isOpenMenu.value
}

const user = useUserStore()

function exit() {
    localStorage.clear()
    location.reload()
}
</script>

<template>
<div class="flex w-full h-full items-center">
    <div class="brand w-40 flex items-center justify-start ml-2">
        <img alt="logo"
             class="w-8 h-8 align-middle"
             src="http://user-assets.sxlcdn.com/images/42894/FvhDgE1TIv5mVA-Y2lzouV5NhhqB.png?imageMogr2/strip/auto-orient/thumbnail/300x300%3E/quality/90!/format/png" />
        <div class="brand-text sm:block ml-2">微草轻课</div>
    </div>
    <div class="menu flex-auto sm:flex justify-end hidden">
        <el-menu :ellipsis="false" default-active="0" mode="horizontal">
            <!--<el-sub-menu index="create">-->
            <!--    <template #title>-->
            <!--        <el-icon>-->
            <!--            <circle-plus />-->
            <!--        </el-icon>-->
            <!--        <span>新建</span>-->
            <!--    </template>-->
            <!--    <el-menu-item index="create-material">添加素材</el-menu-item>-->
            <!--    <el-menu-item index="create-work">创建作品</el-menu-item>-->
            <!--    <el-menu-item index="create-album">创建专辑</el-menu-item>-->
            <!--</el-sub-menu>-->
            <!--<el-menu-item index="message">-->
            <!--    <el-icon>-->
            <!--        <bell />-->
            <!--    </el-icon>-->
            <!--    <span>消息</span>-->
            <!--</el-menu-item>-->

            <el-sub-menu index="quit">
                <template #title>
                    <el-avatar :size="50" :src="fileService.showUrl(user.avatar)" fit="cover" shape="square"></el-avatar>
                    <span style="padding-left: 10px">{{ user.username }}</span>
                </template>
                <el-menu-item index="exit" @click="exit()">
                    <el-icon>
                        <circle-close />
                    </el-icon>
                    退出
                </el-menu-item>
            </el-sub-menu>

        </el-menu>
    </div>
    <div class="menu flex-auto flex justify-end sm:hidden mr-2">
        <el-button :icon="Expand" plain @click="switchOpenMenu"></el-button>
    </div>
    <el-drawer
        v-model="isOpenMenu"
        :with-header="false"
        modal-class="layout-header-drawer-hack"
        size="160px">
        <Aside @select="isOpenMenu = false" />
    </el-drawer>
</div>
</template>

<style lang="less">
.layout-header-drawer-hack .el-drawer .el-drawer__body {
    padding: 0 !important;
}
</style>
