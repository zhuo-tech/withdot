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
const　defaultType=ref()
let tableData: Ref<{
    defaultData: Array<CoreStudent>,
    isPayList: Array<CoreStudent>,
    noPayList: Array<CoreStudent>,
}> = ref({
    defaultData: [],
    isPayList: [],
    noPayList: [],
})

const searchMessage=(query:string)=>{
    const params={
        type:defaultType.value,
        name:query
    }
    getStudentListInit(params).then(response=>{
        if (!response.ok) {
            ElMessage.error(response.error)
        }
        console.log(response)
        tableData.value.defaultData = response.data
    }).catch(err=>{
        console.log(err)
        ElMessage.error(err)
    })
}
/**
 * 切换tab
 * @param {TabsPaneContext} tab
 * @param {Event} event
 */
const handleClick = (tab: TabsPaneContext, event: Event) => {
    const {isPayList, noPayList, defaultData} = tableData.value
    if (tab.props.label === '付费学员') {
        tableData.value.defaultData = isPayList
        defaultType.value = studentType.isPay
    }else{
        tableData.value.defaultData = noPayList
        defaultType.value=studentType.noPay
    }

}

/**
 * 获得学员数据
 */
const getStudentList = async () => {
    let params={
        type:studentType.isPay
    }
    await getStudentListInit(params).then(response => {
        if (!response.ok) {
            ElMessage.error(response.error)
        }
        tableData.value.isPayList = response.data
    }).catch(err => {
        ElMessage.error(err)
    })
    params.type=studentType.noPay
    await getStudentListInit(params).then(response => {
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
    defaultType.value=studentType.isPay
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
                <Student :tableData="tableData" :search-message="searchMessage"/>
            </el-tab-pane>
            <el-tab-pane label="未付费学员" name="second">
                <Student :tableData="tableData" :search-message="searchMessage"/>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<style lang="less" scoped></style>
