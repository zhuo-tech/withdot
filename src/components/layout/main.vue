<!--suppress ES6UnusedImports -->
<script setup lang="ts">
import Aside from '@/components/layout/Aside.vue'
import { Location, Document, Setting } from '@element-plus/icons-vue'
import TopHeader from './header.vue'
import { ref } from 'vue'
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'

const isMenuCollapsed = ref(false)
const isMenuHidden = ref(false)
window.addEventListener('resize', (ev) => {
    const clientWidth = document.documentElement.clientWidth || document.body.clientWidth
    isMenuCollapsed.value = clientWidth < 1024
})
</script>

<template>
<div class="layout">
    <div class="header border-b-2">
        <top-header />
    </div>
    <div class="main flex">
        <div class="menu hidden sm:block overflow-x-hidden">
            <div
                class="collapse-btn flex justify-center items-center shadow-md"
                @click="isMenuHidden = !isMenuHidden"
            >
                <el-icon v-if="isMenuHidden">
                    <d-arrow-right />
                </el-icon>
                <el-icon v-else>
                    <d-arrow-left />
                </el-icon>
            </div>
            <Transition>
                <Aside v-if="!isMenuHidden" class="md:w-40" :collapse="isMenuCollapsed" />
            </Transition>
        </div>
        <div class="page flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 sm:p-4 p-2">
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

        .menu {
            position: relative;

            .collapse-btn {
                position: absolute;
                width: 20px;
                height: 30px;
                background-color: white;
                top: 40%;
                left: 100%;
                z-index: 999;
                cursor: pointer;
                transition: all 0.2s ease-in-out 0s;
            }

            .collapse-btn:hover {
                background-color: lightgray;
            }
        }
    }

    /* we will explain what these classes do next! */

    .v-enter-active,
    .v-leave-active {
        transition: width 0.2s ease;
    }

    .v-enter-from,
    .v-leave-to {
        width: 0;
        opacity: 0;
    }
}
</style>
