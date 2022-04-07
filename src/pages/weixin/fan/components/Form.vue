<script lang="ts" setup>
import { toRefs } from 'vue'
import WxFanService from '../WxFanService'

const props = defineProps<{ service: WxFanService }>()

const {isShow, formIsAdd, formRef, formIsLoading, formData} = toRefs(props.service)
const {formRule, close, formSubmit} = props.service
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

            <el-form-item label="公众号">
                <el-input v-model="formData.wxAccountName" disabled></el-input>
            </el-form-item>

            <el-form-item label="用户标识">
                <el-input v-model="formData.openid" disabled></el-input>
            </el-form-item>

            <el-form-item label="昵称">
                <el-input v-model="formData.nickname" disabled></el-input>
            </el-form-item>

            <el-form-item label="备注" prop="remark">
                <el-input v-model="formData.remark" clearable placeholder="AppSecret"></el-input>
            </el-form-item>

            <el-form-item label="分组" prop="url">
                <el-input v-model="formData.url" clearable placeholder="URL"></el-input>
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
