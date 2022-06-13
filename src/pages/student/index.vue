<script lang="ts" setup>
import { reactive } from 'vue'
import QueryForm from './components/QueryForm.vue'
import StudentService from './StudentService'
import TableList from './components/TableList.vue'
import Detail from './components/Detail.vue'

const service = reactive(new StudentService())

service.getTableList()
</script>

<template>
    <el-card class="box-card">
        <template #header>
            <span>学员管理</span>
        </template>
        <!--搜索框 刷新-->
        <QueryForm :service="service" />
        <el-tabs type="border-card" style="margin-top: 20px" @tab-click="service.tabClick" v-model="service.activeName">
            <el-tab-pane label="未付费">
                <TableList :service="service" name="0"/>
            </el-tab-pane>
            <el-tab-pane label="付费">
                <TableList :service="service" name="1"/>
            </el-tab-pane>
        </el-tabs>
        <Detail :service="service"/>
    </el-card>
</template>

<style lang="less" scoped></style>
