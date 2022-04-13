<script lang="ts" setup>
import { reactive } from 'vue'
import AddForm from './components/AddForm.vue'
import AlbumsService from './AlbumsService'
import { filterTime } from '@/utils/utils'
import { Delete, Edit, Warning, Plus } from '@element-plus/icons-vue'

const service = reactive(new AlbumsService())

service.getAlbumList()
</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div>专辑管理</div>
        </template>
        <el-row :gutter="10">
            <el-col :span="6" :offset="22">
                <el-button type="primary" :icon="Plus" @click="service.clickAddForm()">新增</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top: 20px">
            <el-col :span="24">
                <el-table v-loading="service.addFormData.addFormIsLoading" :data="service.list" style="width: 100%">
                    <el-table-column label="序号" type="index" width="100"></el-table-column>
                    <el-table-column label="标题" prop="title" width="280"></el-table-column>
                    <el-table-column label="价格(元)" prop="sellingPrice" width="280"></el-table-column>
                    <el-table-column label="作品数量" width="280">
                        <template #default="scope">
                            <span>{{ scope.row.workList.length }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" min-width="200" prop="createTime">
                        <template #default="scope">
                            <span>{{ filterTime(scope.createTime) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="180">
                        <template #default="scope">
                            <el-button :icon="Edit" type="text" @click="service.handleEdit(scope.row)">编辑</el-button>
                            <el-divider direction="vertical" />
                            <el-popconfirm :icon="Warning"
                                           cancel-button-text="手滑了"
                                           confirm-button-text="确认删除"
                                           icon-color="red"
                                           title=" 操作无法撤销, 确定要删除吗 ？"
                                           @confirm="service.handleDelete(scope.row)">
                                <template #reference>
                                    <el-button :icon="Delete" type="text">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row justify="end" style="padding-top: 20px" type="flex">
            <el-col :span="6">
                <el-row justify="end" type="flex">
                    <el-pagination
                        :current-page="service.page.currentPage"
                        :page-size="service.page.pageSize"
                        :page-sizes="[10, 20, 50, 100]"
                        :total="service.page.total"
                        layout="total, sizes, prev, pager, next"
                        @size-change="service.pageSizeChange"
                        @current-change="service.currentPageChange">
                    </el-pagination>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
    <AddForm :service="service"></AddForm>
</template>

<style lang="less" scoped></style>
