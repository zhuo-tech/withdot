<script lang="ts" setup>
import QuestionService from '@/pages/question/QuestionService'

const props = defineProps<{
    service: QuestionService
}>()
</script>

<template>
    <el-dialog v-model="service.formData.visible"
               title="提示"
               width="30%">
        <el-form ref="form" :model="service.formData.form" label-width="80px">
            <el-form-item label="题目标题">
                <el-input v-model="service.formData.form.label" placeholder="请输入题目标题"></el-input>
            </el-form-item>
            <el-form-item label="题目内容">

            </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="service.formData.close()">取 消</el-button>
            <el-button :loading="service.formData.formIsLoading" type="primary" @click="service.formData.close()">
                {{ service.formData.formIsLoading ? '提交中 ...' : '确 定' }}
            </el-button>
        </span>
        </template>
    </el-dialog>
</template>

<style lang="less" scoped>
</style>
