<script lang="ts" setup>
import QuestionService, { questionTypeList } from '@/pages/question/QuestionService'

const props = defineProps<{
    service: QuestionService
}>()
</script>

<template>
    <el-dialog v-model="service.formData.selectVisible"
               :title="service.formStatus? '新建选择题':'编辑题目'"
               destroy-on-close
               top="15vh"
               width="40%"
               @close="service.formData.initForm();service.selectList.initContent()">
        <el-form :ref="el => service.formRef = el" :model="service.formData.form" :rules="service.rules" label-width="80px" label-position="top">
            <el-form-item label="题目" prop="label">
                <el-input v-model="service.formData.form.label"
                          :autosize="{ minRows: 2, maxRows: 4 }"
                          placeholder="请输入题目内容"
                          type="textarea" />
            </el-form-item>
            <el-form-item label="选项">
                <div v-for="(item,index) in service.selectList.content" class="options">
                    <el-input v-model="item.answer" placeholder="请输入选项" ></el-input>
                    <el-switch v-model="item.value" active-color="#13ce66" inactive-color="#ff4949" active-text="正确" inactive-text="错误"/>
                    <el-icon @click="service.selectList.deleteOptions(index)"><circle-close-filled /></el-icon>
                </div>
                <span class="addOptions" @click="service.selectList.addOptions()">添加选项</span>
            </el-form-item>
        </el-form>

        <template #footer>
        <span class="dialog-footer">
            <el-button @click="service.formData.allClose();service.selectList.initContent()">取 消</el-button>
            <el-button :loading="service.formData.formIsLoading" type="primary" @click="service.formSubmit">
                {{ service.formData.formIsLoading ? '提交中 ...' : '确 定' }}
            </el-button>
        </span>
        </template>
    </el-dialog>
</template>

<style lang="less" scoped>
.options{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;
    >.el-input{
        flex: 2;
    }
    >.el-switch{
        margin-left: 80px;
        flex: 1;
    }
    >.el-icon{
        color: white;
    }
}
.options:hover>.el-icon{
    color: red;
}
.addOptions{
    cursor: pointer;
}
</style>
