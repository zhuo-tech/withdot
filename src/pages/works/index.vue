<script lang="ts" setup>
import { dataList, del } from '@/api/works'
import { filterTime } from '@/utils/utils'
import { Delete, Edit, Warning } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import Dialog from './components/Dialog.vue'

let data = ref()
const page = reactive({               //分页器参数
    current: 1,
    size: 10,
    total: 1000,
})
const subassembly = reactive({         //子组件抽屉参数
    visible: false,
    title: '',
})
const query = ref()                           //搜索参数
/*
 分页器一页几条
 */
const pageSizeChange = (val: any) => {
    page.size = val
    getListData()
}

/*
 分页器 当前页
 */
const currentPageChange = (val: any) => {
    page.current = val
    getListData()
}

/*
 创建作品
 */
const createWorks = () => {
    subassembly.visible = true
    subassembly.title = '创建作品'
}

/*
 删除
 */
const handleDelete = (row: any) => {
    del(row._id).then(response => {
        ElMessage.success('删除成功')
        getListData()
    }).catch(err => {
        ElMessage.error(err)
    })
}

const getListData = () => {
    dataList(page, query).then(response => {
        data.value = response.data
        page.total = response.total
    }).catch(err => {
        ElMessage.error(err)
    })
}
getListData()
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
        <el-table-column label="标题" prop="name" width="250"></el-table-column>
        <el-table-column label="素材" prop="name" width="300"></el-table-column>
        <el-table-column label="标签" prop="address" width="300"></el-table-column>
        <el-table-column label="创建时间" min-width="200" prop="createTime">
            <template #default="scope">
                <span>{{ filterTime(scope.createTime) }}</span>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
            <template #default="scope">
                <el-button :icon="Edit" type="text" @click="$router.push(`/works/editor/${ scope.row._id }`)">编辑</el-button>
                <el-divider direction="vertical" />
                <el-popconfirm :icon="Warning"
                               cancel-button-text="手滑了"
                               confirm-button-text="确认删除"
                               icon-color="red"
                               title=" 操作无法撤销, 确定要删除吗 ？"
                               @confirm="handleDelete(scope.row)">
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
<Dialog :getListData="getListData" :subassembly="subassembly"></Dialog>
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
