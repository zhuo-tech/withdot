<script setup lang="ts">
import { Location, Document, Setting } from '@element-plus/icons-vue'
</script>

<template>
  <el-menu class="h-full" default-active="/" :router="true">
    <el-menu-item index="/">
      <el-icon>
        <location />
      </el-icon>
      <span>数据看板</span>
    </el-menu-item>
    <el-divider>
      <span class="menu-label">创作</span>
    </el-divider>
    <el-menu-item index="/library">
      <el-icon>
        <document />
      </el-icon>
      <span>素材库</span>
    </el-menu-item>
    <el-menu-item index="/work">
      <el-icon>
        <setting />
      </el-icon>
      <span>作品创作</span>
    </el-menu-item>
    <el-menu-item index="/album">
      <el-icon>
        <setting />
      </el-icon>
      <span>合辑管理</span>
    </el-menu-item>
    <el-divider>
      <span class="menu-label">交易</span>
    </el-divider>
    <el-menu-item index="/member">
      <el-icon>
        <setting />
      </el-icon>
      <span>学员管理</span>
    </el-menu-item>
    <el-menu-item index="/order">
      <el-icon>
        <setting />
      </el-icon>
      <span>订单管理</span>
    </el-menu-item>
    <el-divider>
      <span class="menu-label">设置</span>
    </el-divider>
    <el-menu-item index="/setting">
      <el-icon>
        <setting />
      </el-icon>
      <span>店铺设置</span>
    </el-menu-item>
    <el-menu-item index="/system">
      <el-icon>
        <setting />
      </el-icon>
      <span>系统设置</span>
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