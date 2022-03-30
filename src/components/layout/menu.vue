<script setup lang="ts">
import { Compass, Film, MagicStick, Files, User, ShoppingBag, Setting, Iphone, More } from '@element-plus/icons-vue'

const emit = defineEmits(['select'])
const props = defineProps({
    collapse: Boolean,
})

function onSelect(param: any) {
    emit('select', param)
}
</script>

<template>
<el-menu
    class="h-full"
    default-active="/"
    :collapse="props.collapse"
    :router="true"
    @select="onSelect"
>
    <el-menu-item index="/">
        <el-icon>
            <compass />
        </el-icon>
        <span>数据看板</span>
    </el-menu-item>
    <el-divider v-if="!props.collapse">
        <span class="menu-label">创作</span>
    </el-divider>
    <el-menu-item index="/materials">
        <el-icon>
            <film />
        </el-icon>
        <span>素材库</span>
    </el-menu-item>
    <el-menu-item index="/works">
        <el-icon>
            <magic-stick />
        </el-icon>
        <span>作品中心</span>
    </el-menu-item>
    <el-menu-item index="/albums">
        <el-icon>
            <files />
        </el-icon>
        <span>专辑管理</span>
    </el-menu-item>
    <el-divider v-if="!props.collapse">
        <span class="menu-label">交易</span>
    </el-divider>
    <el-menu-item index="/users">
        <el-icon>
            <user />
        </el-icon>
        <span>学员管理</span>
    </el-menu-item>
    <el-menu-item index="/orders">
        <el-icon>
            <shopping-bag />
        </el-icon>
        <span>订单管理</span>
    </el-menu-item>
    <el-divider v-if="!props.collapse">
        <span class="menu-label">设置</span>
    </el-divider>
    <el-menu-item index="/settings/app">
        <el-icon>
            <iphone />
        </el-icon>
        <span>应用设置</span>
    </el-menu-item>
    <el-menu-item index="/settings/dev">
        <el-icon>
            <setting />
        </el-icon>
        <span>开发配置</span>
    </el-menu-item>
    <el-divider v-if="!props.collapse">
        <span class="menu-label">账户</span>
    </el-divider>
    <el-sub-menu index="/my">
        <template #title>
            <el-icon>
                <more />
            </el-icon>
            <span>我的账户</span>
        </template>
        <el-menu-item index="/my/profile">账户信息</el-menu-item>
        <el-menu-item index="/logout">
            <span class="text-red-500">退出登陆</span>
        </el-menu-item>
    </el-sub-menu>
</el-menu>
</template>

<style scoped lang="less">
.menu-label {
@apply text-gray-500;
@apply font-light;
@apply text-xs;
}
</style>
