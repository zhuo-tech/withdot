<script lang="ts" setup>
import QuestionService from '@/pages/question/QuestionService'

const props = defineProps<{
    service: QuestionService
}>()

</script>

<template>
    <el-dialog v-model="service.formData.tkVisible"
               :title="service.formStatus? '新建填空题':'编辑题目'"
               destroy-on-close
               top="15vh"
               width="40%"
               @close="service.formData.initForm();service.tkList.initContent()">
        <el-form :ref="el => service.formRef = el" :model="service.formData.form" :rules="service.rules" label-position="top" label-width="80px">
            <el-form-item label="题目" prop="label">
                <el-input v-model="service.formData.form.label"
                          :autosize="{ minRows: 2, maxRows: 4 }"
                          placeholder="请输入"
                          type="textarea" />
            </el-form-item>
            <el-form-item label="答案">
                <div v-for="(item,index) in service.tkList.content" :key="index" class="options">
                    <el-input v-model="item.answer" placeholder="请输入答案" ></el-input>
                    <el-icon @click="service.tkList.deleteOptions(index)"><circle-close-filled /></el-icon>
                </div>
                <span class="addOptions" @click="service.tkList.addOptions()">添加答案</span>
            </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="service.formData.allClose();service.tkList.initContent()">取 消</el-button>
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
.options{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;
    >.el-input{
        width: 40%;
    }
    >.el-icon{
        color: white;
        margin-left: 30px;
    }
}
.options:hover>.el-icon{
    color: red;
}
.addOptions{
    cursor: pointer;
}
</style>
