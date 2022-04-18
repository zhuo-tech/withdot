<script lang="ts" setup>
import QuestionService, { questionTypeList } from '@/pages/question/QuestionService'

const props = defineProps<{
    service: QuestionService
}>()
</script>

<template>
    <el-dialog v-model="service.formData.saqVisible"
               destroy-on-close
               :title="service.formStatus? '新建题目':'编辑题目'"
               top="2vh"
               width="40%"
               @close="service.formData.initForm()">
        <el-form :ref="el => service.formRef = el" :model="service.formData.form" :rules="service.rules" label-width="80px">
            <el-form-item label="题目" prop="label">
                <el-input v-model="service.formData.form.label"
                          :autosize="{ minRows: 2, maxRows: 4 }"
                          placeholder="请输入题目内容"
                          type="textarea" />
            </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="service.formData.allClose()">取 消</el-button>
            <el-button :loading="service.formData.formIsLoading" type="primary" @click="service.formSubmit">
                {{ service.formData.formIsLoading ? '提交中 ...' : '确 定' }}
            </el-button>
        </span>
        </template>
    </el-dialog>
</template>

<style lang="less" scoped>
</style>
