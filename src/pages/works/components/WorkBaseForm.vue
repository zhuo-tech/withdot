<script lang="ts" setup>
import UploadFile from '@/components/Upload/UploadFile.vue'
import { CoreWork } from '@/model/entity/CoreWork'
import { FormInstance } from 'element-plus'
import { ref, Ref } from 'vue'
import { useWorkBaseForm } from './useWorkBaseForm'

/**
 * 作品基本信息编辑
 */
const props = defineProps({
    data: {
        type: [CoreWork, Object],
        default: () => (new CoreWork()),
    },
})
const formRef: Ref<FormInstance> = ref({} as any)
const {isShow, formIsLoading, formData, formRule, show, close, submit} = useWorkBaseForm(formRef, props as any)

</script>

<template>
<el-icon @click="show">
    <edit-pen />
</el-icon>
<el-dialog v-model="isShow"
           append-to-body
           close-on-click-modal
           destroy-on-close
           draggable
           lock-scroll
           modal
           title="封面编辑"
           width="45%">
    <el-form ref="formRef"
             v-loading="formIsLoading"
             :model="formData"
             :rules="formRule"
             label-width="140px"
             style="max-width: 1000px">

        <el-form-item label="Web 端 封面" prop="covers.pc">
            <UploadFile v-model:file-info="formData.covers.pc" :drag="true" :limit="1" listType="picture" />
        </el-form-item>

        <el-form-item label="移动端 封面" prop="covers.mp">
            <UploadFile v-model:file-info="formData.covers.mp" :drag="true" :limit="1" listType="picture" />
        </el-form-item>

    </el-form>

    <div slot="footer" class="drawer-body-footer" style="padding-left: 30px">
        <el-button @click="close">取 消</el-button>
        <el-button :loading="formIsLoading" type="primary" @click="submit">
            {{ formIsLoading ? '提交中 ...' : '确 定' }}
        </el-button>
    </div>
</el-dialog>
</template>
