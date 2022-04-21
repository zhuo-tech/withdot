<script lang="ts" setup>
import { dataList, del } from '@/api/works'
import { filterTime } from '@/utils/utils'
import { Delete, Edit, Warning,Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import Dialog from './components/Dialog.vue'

let data = ref()
let loading = ref(false)
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
    loading.value = true
    dataList(page, query).then(response => {
        data.value = response?.data
        page.total = response?.total as number
        loading.value = false
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
    <div>
        <el-button class="create" type="primary" :icon="Plus" @click="createWorks">新增</el-button>
    </div>
    <el-table :data="data" stripe style="width: 100%" v-loading="loading">
        <el-table-column align="center" label="序号" type="index" width="80" />
        <el-table-column label="标题" min-width="100" prop="name" />
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
        <el-table-column align="center" label="操作" width="170">
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
