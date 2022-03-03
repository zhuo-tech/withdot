<script setup lang="ts">
import { Compass, Film, MagicStick, Files, UserFilled, ShoppingBag, Setting, Iphone } from '@element-plus/icons-vue'

const emit = defineEmits(['select'])
const props = defineProps({
  collapse: Boolean
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
    <el-menu-item index="/library">
      <el-icon>
        <film />
      </el-icon>
      <span>素材库</span>
    </el-menu-item>
    <el-menu-item index="/work">
      <el-icon>
        <magic-stick />
      </el-icon>
      <span>作品中心</span>
    </el-menu-item>
    <el-menu-item index="/album">
      <el-icon>
        <files />
      </el-icon>
      <span>专辑管理</span>
    </el-menu-item>
    <el-divider v-if="!props.collapse">
      <span class="menu-label">交易</span>
    </el-divider>
    <el-menu-item index="/member">
      <el-icon>
        <user-filled />
      </el-icon>
      <span>学员管理</span>
    </el-menu-item>
    <el-menu-item index="/order">
      <el-icon>
        <shopping-bag />
      </el-icon>
      <span>订单管理</span>
    </el-menu-item>
    <el-divider v-if="!props.collapse">
      <span class="menu-label">设置</span>
    </el-divider>
    <el-menu-item index="/setting">
      <el-icon>
        <iphone />
      </el-icon>
      <span>应用设置</span>
    </el-menu-item>
    <el-menu-item index="/system">
      <el-icon>
        <setting />
      </el-icon>
      <span>开发配置</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped lang="less">
.menu-label {
  @apply text-gray-500;
  @apply font-light;
  @apply text-xs;
}
</style>