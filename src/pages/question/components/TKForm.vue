<script lang="ts" setup>
import QuestionService from '@/pages/question/QuestionService'

const props = defineProps<{
    service: QuestionService
}>()

const tk = '${}'
const addTK = () => {
    props.service.formData.form.label = props.service.formData.form.label.concat(`${ tk }`)
}
</script>

<template>
    <el-dialog v-model="service.formData.tkVisible"
               :title="service.formStatus? '新建题目':'编辑题目'"
               destroy-on-close
               top="15vh"
               width="40%"
               @close="service.formData.initForm()">
        <el-form :ref="el => service.formRef = el" :model="service.formData.form" :rules="service.rules" label-position="top" label-width="80px">
            <el-form-item label="题目">
                <el-input v-model="service.formData.form.label"
                          :autosize="{ minRows: 2, maxRows: 4 }"
                          placeholder="请输入"
                          type="textarea" />
            </el-form-item>
            <div class="tkButton">
                <div @click="addTK()">
                    <el-icon>
                        <circle-plus />
                    </el-icon>
                    <span>添加填空</span>
                </div>
            </div>
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
.tkButton {
    display: flex;
    justify-content: center;

    > div {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
    }
}

.tkText {
    width: 100%;
    min-height: 100px;
    max-height: 300px;
    margin: 10px;
    border: 1px solid #888888;
}

.tkText:focus {
    border-radius: 0;
    border: 1px solid #888888;
}
</style>
