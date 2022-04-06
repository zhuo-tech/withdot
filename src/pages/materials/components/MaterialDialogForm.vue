<script setup lang="ts">
import { ObjectUtil, StrUtil } from 'typescript-util'
import { toRefs } from 'vue'
import MaterialService from '../MaterialService'
import UploadFile from '@/components/Upload/UploadFile.vue'

const props = defineProps<{ service: MaterialService }>()

const UploadFileOnInput = () => {
    const {service} = props
    const {file, title} = service.formData
    // 优化: 自动使用文件名填充标题
    if (StrUtil.isNotEmpty(file?.name) && StrUtil.isEmpty(title)) {
        service.formData.title = file?.name
    }
    // 必须: 填充 type href
    if (ObjectUtil.isNotEmpty(file)) {
        service.formData.href = file?.href
        service.formData.type = file?.type
    }
}
const {isShow, formIsAdd, formRef, formIsLoading, formData} = toRefs(props.service)
const {formRule, tagOption, close, formSubmit} = props.service
</script>

<template>
<el-dialog
    v-model="isShow"
    :title="formIsAdd ? '新增' : '编辑' "
    append-to-body
    close-on-click-modal
    destroy-on-close
    draggable
    lock-scroll
    modal
    width="45%">
    <el-form :ref="el => service.formRef = el"
             v-loading="formIsLoading"
             :model="formData"
             :rules="formRule"
             label-width="140px"
             style="max-width: 1000px">

        <el-form-item label="标题" prop="title">
            <el-input v-model="formData.title" placeholder="素材标题" />
        </el-form-item>

        <el-form-item label="标签" prop="tag">
            <el-select v-model="formData.tag"
                       allow-create
                       default-first-option
                       filterable
                       multiple
                       placeholder="选择或输入"
                       style="width: 100%;">
                <el-option v-for="(tag, index) in tagOption" :key="index" :label="tag" :value="tag" />
            </el-select>
        </el-form-item>

        <el-form-item label="文件上传" prop="file">
            <UploadFile v-model:file-info="formData.file"
                        v-model:href="formData.href"
                        :drag="true"
                        :limit="1"
                        listType="picture"
                        @input="UploadFileOnInput" />
        </el-form-item>

    </el-form>

    <div slot="footer" class="drawer-body-footer" style="padding-left: 30px">
        <el-button @click="close">取 消</el-button>
        <el-button :loading="formIsLoading" type="primary" @click="formSubmit">
            {{ formIsLoading ? '提交中 ...' : '确 定' }}
        </el-button>
    </div>
</el-dialog>
</template>
