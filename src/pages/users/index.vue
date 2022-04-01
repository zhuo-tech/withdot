<script lang="ts" setup>
import { getStudentListInit, studentType } from '@/api/student'
import { getLogger } from '@/main'
import { CoreStudent } from '@/model/entity/CoreStudent'
import type { TabsPaneContext } from 'element-plus'
import { ElMessage } from 'element-plus'
import { onMounted, Ref, ref } from 'vue'
import Student from './components/Student.vue'

const log = getLogger('学员管理')
const activeName = ref('first')

let tableData: Ref<{
    defaultData: Array<CoreStudent>,
    isPayList: Array<CoreStudent>,
    noPayList: Array<CoreStudent>,
}> = ref({
    defaultData: [],
    isPayList: [],
    noPayList: [],
})

/**
 * 切换tab
 * @param {TabsPaneContext} tab
 * @param {Event} event
 */
const handleClick = (tab: TabsPaneContext, event: Event) => {
    const {isPayList, noPayList, defaultData} = tableData.value
    if (tab.props.label === '付费学员') {
        tableData.value.defaultData = isPayList
        return
    }
    tableData.value.defaultData = noPayList
}

/**
 * 获得学员数据
 */
const getStudentList = async () => {
    await getStudentListInit(studentType.isPay).then(response => {
        if (!response.ok) {
            ElMessage.error(response.error)
        }
        tableData.value.isPayList = response.data
    }).catch(err => {
        ElMessage.error(err)
    })
    await getStudentListInit(studentType.noPay).then(response => {
        if (!response.ok) {
            ElMessage.error(response.error)
        }
        tableData.value.noPayList = response.data
    }).catch(err => {
        ElMessage.error(err)
    })
}

onMounted(async () => {
    await getStudentList()
    tableData.value.defaultData = tableData.value.isPayList
})
</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <h1>学员管理</h1>
            </div>
        </template>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="付费学员" name="first">
                <Student :tableData="tableData" />
            </el-tab-pane>
            <el-tab-pane label="未付费学员" name="second">
                <Student :tableData="tableData" />
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<style lang="less" scoped></style>
