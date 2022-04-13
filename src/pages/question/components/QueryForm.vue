<script lang="ts" setup>
import QuestionService from '@/pages/question/QuestionService'
import { CirclePlusFilled, Refresh, Search } from '@element-plus/icons-vue'

const props = defineProps<{
    service: QuestionService
}>()

</script>

<template>
    <el-row justify="end" type="flex">
        <el-collapse-transition>
            <el-col v-show="service.showQuery">
                <el-row :gutter="10" type="flex" justify="end">
                    <el-col>
                        <el-form ref="queryFormRef" :model="service.queryData" inline>
                            <el-form-item style="width: 200px">
                                <el-input v-model="service.queryData.label" clearable placeholder="请输入题目名称"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button :icon="Search" type="primary" @click="service.getList()"> </el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </el-col>
        </el-collapse-transition>
        <el-col :span="12">
            <el-row justify="end" type="flex">
                <el-button :icon="CirclePlusFilled" type="primary" @click="service.addQuestion()">新建题目</el-button>
                <el-button :icon="Search" type="primary" @click="service.searchQuestion()" />
                <el-button v-loading="service.tableIsLoading"
                           :disabled="service.tableIsLoading"
                           :icon="Refresh"
                           type="primary"
                           @click="service.listUpdate"></el-button>
            </el-row>
        </el-col>
    </el-row>
</template>

<style lang="less" scoped>
</style>
