<script lang="ts" setup>
import { reactive } from 'vue'
import AddForm from './components/AddForm.vue'
import AlbumsService from './AlbumsService'

const service = reactive(new AlbumsService())
</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div>专辑管理</div>
        </template>
        <el-row :gutter="10">
            <el-col :span="6">
                <el-button type="primary" @click="service.clickAddForm()">创建新专辑</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top: 20px">
            <el-col :span="24">
                <el-table
                    :data="[{ date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }, { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' }]"
                    style="width: 100%">
                    <el-table-column
                        label="日期"
                        prop="date"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        label="姓名"
                        prop="name"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        label="地址"
                        prop="address">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </el-card>
    <AddForm :service="service"></AddForm>
</template>

<style scoped lang="less"></style>
