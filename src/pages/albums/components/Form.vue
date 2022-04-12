<script lang="ts" setup>
import EditService from '@/pages/albums/editService'
import UploadFile from '@/components/upload/UploadFile.vue'
import { toRefs } from 'vue'

const props = defineProps<{ service: EditService }>()
const {Editform, rules} = toRefs(props.service)
</script>

<template>
    <el-dialog v-model="Editform.visible" title="编辑专辑" width="40%">
        <el-form :ref="el => service.formRef = el" :model="Editform.form" :rules="rules" label-width="80px">
            <el-form-item label="专辑名称" prop="title">
                <el-input v-model="Editform.form.title" placeholder="请输入专辑名称"></el-input>
            </el-form-item>
            <el-form-item label="专辑描述" prop="desc">
                <el-input v-model="Editform.form.desc" placeholder="请输入专辑描述" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="封面图" prop="cover">
                <UploadFile v-model:file-info="Editform.form.cover"
                            v-model:href="Editform.form.coverHref"
                            :drag="true"
                            :limit="1"
                            listType="picture" />
            </el-form-item>
            <el-form-item label="销售价">
                <el-input v-model="Editform.form.sellingPrice" placeholder="请输入销售价格"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="Editform.close()">取 消</el-button>
            <el-button :loading="Editform.formIsLoading" type="primary" @click="service.formSubmit()">
                {{ Editform.formIsLoading ? '提交中 ...' : '确 定' }}
            </el-button>
        </span>
        </template>
    </el-dialog>
</template>

<style lang="less" scoped>
</style>
