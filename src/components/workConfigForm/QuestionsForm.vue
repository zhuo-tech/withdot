<script lang="ts" setup>
import { initQuestionList } from '@/api/questionFormApi'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { filterTime } from '@/utils/utils'
import { QuestionType } from '@/pages/question/QuestionService'

const props = defineProps({
    value: {
        type: Object,
        required: true,
    },
})

let tableData = ref()                               //表格数据
const page: any = reactive({                      //分页参数
    total: 10,
    current: 1,
    size: 5,
})

/**
 * 获得表格数据列表
 * @param {Object} page
 */
const getQuestionList = (page: any) => {
    initQuestionList(page).then(response => {
        tableData.value = response.data
        page.total = response.total
    }).catch(err => {
        ElMessage.error(err)
    })
}

const currentPageChange = (val: any) => {
    page.current = val
    getQuestionList(page)
}

/**
 * 表格 多选发生变化调用函数
 */
const handleSelectionChange=(res:any)=>{
    console.log(res,'选中的数据')
}
getQuestionList(page)
</script>

<template>
    <el-form ref="form" :model="value" label-width="80px" style="width: 100%">
        <el-row>
            <el-col :span="12">
                <el-form-item label="设置时长">
                    <el-switch v-model="value.switch"></el-switch>
                </el-form-item>
            </el-col>
            <el-col v-if="value.switch" :span="12">
                <el-form-item label="时长">
                    <el-input-number v-model="value.time" :min="1"></el-input-number>&nbsp;&nbsp;&nbsp;秒
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="是否暂停">
            <el-switch v-model="value.pause"></el-switch>
        </el-form-item>
        <el-form-item label="题目">
            <el-table :data="tableData"
                      style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column label="题目" prop="label" width="250" />
                <el-table-column label="类型" width="120">
                    <template #default="{row}">{{ QuestionType[row.type] }}</template>
                </el-table-column>
                <el-table-column label="更新时间" min-width="200">
                    <template #default="{row}">{{ filterTime(row.updateTime) }}</template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-row justify="end" style="padding-top: 20px" type="flex">
            <el-col :span="6">
                <el-row justify="end" type="flex">
                    <el-pagination :current-page="page.current"
                                   :page-size="page.size"
                                   :total="page.total"
                                   background layout="prev, pager, next"
                                   small
                                   @current-change="currentPageChange" />
                </el-row>
            </el-col>
        </el-row>
    </el-form>
</template>
