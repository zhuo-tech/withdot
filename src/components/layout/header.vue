<script setup lang="ts">
</script>

<template>
  <div class="flex w-full h-full items-center">
    <div class="brand w-40 flex items-center justify-center">
      <img
        src="http://user-assets.sxlcdn.com/images/42894/FvhDgE1TIv5mVA-Y2lzouV5NhhqB.png?imageMogr2/strip/auto-orient/thumbnail/300x300%3E/quality/90!/format/png"
        alt="logo"
        class="w-8 h-8 align-middle"
      />
      <div class="brand-text ml-2">微草轻课</div>
    </div>
    <div class="menu flex-auto flex justify-end">
      <el-menu default-active="0" mode="horizontal" :ellipsis="false">
        <el-sub-menu index="create">
          <template #title>新建</template>
          <el-menu-item index="create-material">添加素材</el-menu-item>
          <el-menu-item index="create-work">创建作品</el-menu-item>
          <el-menu-item index="create-album">创建专辑</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="message">消息</el-menu-item>
        <el-sub-menu index="my">
          <template #title>我的账户</template>
          <el-menu-item index="profile">账户信息</el-menu-item>
          <el-menu-item index="logout">退出登陆</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<style scoped lang="less">
.brand {
  border-right: 1px solid rgba(211, 211, 211, 0.5);
  line-height: 32px;
}
</style>