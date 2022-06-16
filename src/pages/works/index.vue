<script lang="ts" setup>
import { WorksService } from '@/pages/works/hooks/worksService'
import { filterTime } from '@/utils/utils'
import { Delete, Edit, Warning, Plus } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import QueryForm from './components/QueryForm.vue'
import Dialog from './components/Dialog.vue'
const service = reactive(new WorksService())
service.getListData()
</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <h1>作品中心</h1>
            </div>
        </template>
        <QueryForm :service="service" />
        <el-table v-loading="service.loading" :data="service.data" stripe style="width: 100%">
            <el-table-column align="center" label="序号" type="index" width="80" />
            <el-table-column label="标题" min-width="200" prop="name" />
            <el-table-column label="素材" min-width="300">
                <template v-slot="{row}">
                    <span>{{ row['materialNews']?.title }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间" prop="createTime" width="170">
                <template #default="scope">
                    <span>{{ filterTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" fixed="right" label="操作" width="270">
                <template #default="scope">
                    <el-button :icon="Edit" type="text" @click="$router.push(`/works/editor/${ scope.row._id }`)">编辑</el-button>
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
                        :current-page="service.page.current"
                        :page-size="service.page.size"
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
    <Dialog :getListData="service.getListData" :subassembly="service.subassembly"></Dialog>
</template>

<style lang="less" scoped>
.tag {
    margin: 20px 0;

    .el-tag:nth-of-type(1) {
        margin-left: 0;
    }
}

.create {
    margin-bottom: 20px;
}
</style>
