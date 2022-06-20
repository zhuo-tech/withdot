<script lang="ts" setup>
import { reactive } from 'vue'
import QueryForm from './components/QueryForm.vue'
import StudentService from './StudentService'
import TableList from './components/TableList.vue'

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
        <TableList :service="service" name="0" />
        <!--<Detail :service="service" />-->
    </el-card>
</template>

<style lang="less" scoped></style>
