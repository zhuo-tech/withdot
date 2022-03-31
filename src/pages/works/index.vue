<script lang="ts" setup>
import { reactive } from 'vue'

const list:Array<any> = []
const data = reactive(list)
const page=reactive({
    current:1,
    size:10,
    total:1000,
})

/*
分页器一页几条
 */
const pageSizeChange=()=>{}

/*
分页器 当前页
 */
const currentPageChange=()=>{}

/*
编辑
 */
const handleEdit = () => {
}

/*
删除
 */
const handleDelete = () => {
}
</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <h1>作品中心</h1>
            </div>
        </template>
        <div class="tag">
            <el-tag v-for="(item,index) in 4" :key="index" class="ml-2" type="success">Tag 2</el-tag>
        </div>
        <div>
            <el-button type="primary" class="create">创建作品</el-button>
        </div>
        <el-table :data="data"  stripe style="width: 100%">
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="标题" prop="date" width="250"></el-table-column>
            <el-table-column label="素材" prop="name" width="300"></el-table-column>
            <el-table-column label="标签" prop="address" width="300"></el-table-column>
            <el-table-column label="创建时间" min-width="200" prop="address"></el-table-column>
            <el-table-column label="操作" fixed="right" width="180">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row justify="end" style="padding-top: 20px" type="flex">
            <el-col :span="6">
                <el-row justify="end" type="flex">
                    <el-pagination
                        :current-page="page.current"
                        :page-size="page.size"
                        :page-sizes="[10, 20, 50, 100]"
                        :total="page.total"
                        layout="total, sizes, prev, pager, next"
                        @size-change="pageSizeChange"
                        @current-change="currentPageChange">
                    </el-pagination>
                </el-row>
            </el-col>
        </el-row>
    </el-card>

</template>

<style lang="less" scoped>
.tag {
    margin: 20px 0;

    .el-tag:nth-of-type(1) {
        margin-left: 0;
    }
}
.create{
    margin-bottom: 20px;
}
</style>
