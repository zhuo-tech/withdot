<script lang="ts" setup>
import AccountList from '@/pages/weixin/account/AccountList.vue'
</script>

<template>

<el-card class="box-card">
    <template #header>
        <div>素材管理</div>
    </template>

    <el-row :gutter="10">
        <el-col :xs="8" :xm="7" :md="6" :lg="5">
            <AccountList :value="''" :auto-select-first="true" />
        </el-col>
        <el-col :xs="16" :xm="17" :md="18" :lg="19">
            <h1>内容区</h1>
        </el-col>
    </el-row>
</el-card>
</template>

<style lang="less" scoped>
</style>
