<script lang="ts" setup>
import ShowFile from '@/components/Upload/ShowFile'
import StudentService from '@/pages/student/StudentService'
import { filterTime } from '@/utils/utils'

const props = defineProps({
    service: StudentService,
})

</script>
<template>
    <div>
        <el-table
            v-loading="service.tableData.tableIsLoading"
            :data="service.tableData.list"
            stripe
            style="width: 100%">
            <el-table-column label="序号" type="index" width="80" />
            <el-table-column label="名称" min-width="200" prop="name"/>
            <el-table-column label="头像" width="200">
                <template #default="{row}">
                    <ShowFile :href="row.avatar" style="height: 50px;border-radius: 5px" />
                </template>
            </el-table-column>
            <el-table-column label="是否付费" min-width="100">
                <template #default="scope">
                    <span v-if="scope.row.isPay==='0'">付费</span>
                    <span v-if="scope.row.isPay==='1'">未付费</span>
                </template>
            </el-table-column>
            <el-table-column label="手机号" prop="phone" width="250" />
            <el-table-column label="创建时间" min-width="200">
                <template #default="{row}">
                    <span>{{ filterTime(row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="最后登录时间" min-width="200">
                <template #default="{row}">
                    <span>{{ filterTime(row.updateTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="{row}">
                    <el-button size="small" type="text" @click="service.handleClick(row._id)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row justify="end" style="margin-top: 20px" type="flex">
            <el-col :span="6">
                <el-row justify="end" type="flex">
                    <el-pagination
                        :current-page="service.tableData.page.current"
                        :page-size="service.tableData.page.size"
                        :page-sizes="[10, 20, 50, 100]"
                        :total="service.tableData.page.total"
                        layout="total, sizes, prev, pager, next"
                        @currentChange="service.currentPageChange"
                        @sizeChange="service.pageSizeChange">
                    </el-pagination>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
