<script lang="ts" setup>
import { CoreStudent } from '@/model/entity/CoreStudent'
import { Search } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import Detail from './Detail.vue'

const props = defineProps<{
    tableData: {
        defaultData: Array<CoreStudent>,
        isPayList: Array<CoreStudent>,
        noPayList: Array<CoreStudent>,
    },
    searchMessage:(query:string)=>void
}>()
const detailMessage = reactive({
    visible: false,
    title: '学员详情',
    name: '蓝色港湾',
    studentId: 3213,
    createTime: '2019-8-13 08:32',
    data: [
        {date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
        {date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄'},
    ],
})
let query = ref('')

const detail = (): void => {
    detailMessage.visible = true
}
const searchList=()=>{
    props.searchMessage(query.value)
}
</script>
<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <!-- 搜索与添加区域 -->
                <el-input v-model="query"
                          clearable placeholder="请输入内容">
                    <template #append>
                        <el-button @click="searchList">
                            <el-icon>
                                <search />
                            </el-icon>
                        </el-button>
                    </template>
                </el-input>
            </el-col>
        </el-row>
        <el-table :data="tableData.defaultData" style="width: 100%">
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="用户名" prop="name" width="180"></el-table-column>
            <el-table-column label="用户ID" prop="user_id" width="180"></el-table-column>
            <el-table-column label="手机号" prop="phone"></el-table-column>
            <el-table-column label="注册时间" prop="createTime" width="180"></el-table-column>
            <el-table-column label="最后登录时间" prop="lastLoginTime" width="180"></el-table-column>
            <el-table-column fixed="right" label="编辑">
                <template #default="scope">
                    <el-button size="small" @click="detail">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Detail :detailMessage="detailMessage" />
    </div>
</template>

<style lang="less" scoped></style>
