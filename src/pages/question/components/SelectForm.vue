<script lang="ts" setup>
import QuestionService, { questionTypeList } from '@/pages/question/QuestionService'
import Editor from '@/components/editor/Editor.vue'

const props = defineProps<{
    service: QuestionService
}>()
</script>

<template>
    <el-dialog v-model="service.formData.selectVisible"
               destroy-on-close
               :title="service.formStatus? '新建题目':'编辑题目'"
               top="2vh"
               width="70%"
               @close="service.formData.initForm()">
        选择
        <el-form :ref="el => service.formRef = el" :model="service.formData.form" :rules="service.rules" label-width="80px">
            <el-form-item label="题目" prop="label">
                <el-input v-model="service.formData.form.label" placeholder="请输入题目"></el-input>
            </el-form-item>
            <el-form-item label="选项">

            </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="service.formData.close()">取 消</el-button>
            <el-button :loading="service.formData.formIsLoading" type="primary" @click="service.formSubmit">
                {{ service.formData.formIsLoading ? '提交中 ...' : '确 定' }}
            </el-button>
        </span>
        </template>
    </el-dialog>
</template>

<style lang="less" scoped>
</style>
