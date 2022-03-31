<script lang="ts" setup>
import { reactive } from 'vue'
import Dialog from './components/Dialog.vue'

const list: Array<any> = [{
    name:'dsfa'
}]                  //表格数据
const data = reactive(list)
const page = reactive({               //分页器参数
    current: 1,
    size: 10,
    total: 1000,
})
const subassembly = reactive({         //子组件抽屉参数
    visible: false,
    title: '',
})
/*
分页器一页几条
 */
const pageSizeChange = () => {
}

/*
分页器 当前页
 */
const currentPageChange = () => {
}

/*
创建作品
 */
const createWorks = () => {
    subassembly.visible=true
    subassembly.title='创建作品'
}
/*
编辑
 */
const handleEdit = (row:any) => {
    subassembly.visible=true
    subassembly.title='编辑'
}

/*
删除
 */
const handleDelete = (row:any) => {
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
            <el-button class="create" type="primary" @click="createWorks">创建作品</el-button>
        </div>
        <el-table :data="data" stripe style="width: 100%">
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="标题" prop="date" width="250"></el-table-column>
            <el-table-column label="素材" prop="name" width="300"></el-table-column>
            <el-table-column label="标签" prop="address" width="300"></el-table-column>
            <el-table-column label="创建时间" min-width="200" prop="address"></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-popconfirm title="确定删除此作品吗?">
                        <template #reference>
                            <el-button type="primary"  size="small" @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-popconfirm>
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
    <Dialog :subassembly="subassembly"></Dialog>
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
