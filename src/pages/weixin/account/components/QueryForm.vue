<script lang="ts" setup>
import { CirclePlusFilled, Refresh, Search } from '@element-plus/icons-vue'
import WxAccountService from '../WxAccountService'

const props = defineProps<{
    service: WxAccountService
}>()

</script>

<template>
<el-row justify="end" type="flex">
    <el-collapse-transition>
        <el-col v-show="service.showQuery">
            <el-form ref="queryFormRef" :model="service.queryData" inline label-width="80px">
                <el-form-item>
                    <el-input v-model="service.queryData.name" clearable placeholder="公众号名称"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="service.queryData.account" clearable placeholder="公众号账户"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button :icon="Search" type="primary" @click="service.queryFormSubmit"></el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-collapse-transition>
    <el-col :span="12">
        <el-row justify="end" type="flex">
            <el-button :icon="CirclePlusFilled" type="primary" @click="service.readyAdd">新建账号</el-button>
            <el-button :icon="Search" type="primary" @click="service.showQuery = !(service.showQuery)" />
            <el-button v-loading="service.tableIsLoading"
                       :disabled="service.tableIsLoading"
                       :icon="Refresh"
                       type="primary"
                       @click="service.listUpdate"></el-button>
        </el-row>
    </el-col>
</el-row>
</template>
