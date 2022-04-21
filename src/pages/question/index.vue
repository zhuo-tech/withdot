<script lang="ts" setup>
import SAQForm from '@/pages/question/components/SAQForm.vue'
import QuestionService,{QuestionType} from '@/pages/question/QuestionService'
import { reactive } from 'vue'
import QueryForm from './components/QueryForm.vue'
import SelectForm from './components/SelectForm.vue'
import TKForm from './components/TKForm.vue'
import SQAForm from './components/SAQForm.vue'
import { Delete, Edit, Warning } from '@element-plus/icons-vue'
import { filterTime } from '@/utils/utils'

const service = reactive(new QuestionService())

const {data,pageSizeChange,currentPageChange} = service
service.getList()
</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div>题库管理</div>
        </template>
        <!--功能栏-->
        <QueryForm :service="service" />
        <!--表格-->
        <el-table v-loading="service.data.loading" :data="service.data.list" style="width: 100%">
            <el-table-column label="序号" type="index" width="100"></el-table-column>
            <el-table-column label="题目标题" min-width="400" prop="label"></el-table-column>
            <el-table-column label="题目类型" prop="type" width="180">
                <template #default="scope">
                    <span>{{ QuestionType[scope.row.type] }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="createTime" width="280">
                <template #default="scope">
                    <span>{{ filterTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="更新时间" prop="updateTime" width="280">
                <template #default="scope">
                    <span>{{ filterTime(scope.row.updateTime) }}</span>
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
        <el-row justify="end" style="padding-top: 20px" type="flex">
            <el-col :span="6">
                <el-row justify="end" type="flex">
                    <el-pagination
                        :current-page="data.page.currentPage"
                        :page-size="data.page.pageSize"
                        :page-sizes="[10, 20, 50, 100]"
                        :total="data.page.total"
                        layout="total, sizes, prev, pager, next"
                        @size-change="pageSizeChange"
                        @current-change="currentPageChange">
                    </el-pagination>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
    <SelectForm :service="service" />
    <SAQForm :service="service" />
    <TKForm :service="service" />
</template>

<style lang="less" scoped>
</style>
