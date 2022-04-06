<script setup lang="ts">
import { toRefs } from 'vue'
import WxAccountService from '../WxAccountService'

const props = defineProps<{ service: WxAccountService }>()

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

        <el-form-item label="公众号名称" prop="name">
            <el-input v-model="formData.name" clearable placeholder="公众号名称"></el-input>
        </el-form-item>

        <el-form-item label="公众号账户" prop="account">
            <el-input v-model="formData.account" clearable placeholder="公众号账户"></el-input>
        </el-form-item>

        <el-form-item label="AppId" prop="appid">
            <el-input v-model="formData.appid" clearable placeholder="AppId"></el-input>
        </el-form-item>

        <el-form-item label="AppSecret" prop="appSecret">
            <el-input v-model="formData.appSecret" clearable placeholder="AppSecret"></el-input>
        </el-form-item>

        <el-form-item label="URL" prop="url">
            <el-input v-model="formData.url" clearable placeholder="URL"></el-input>
        </el-form-item>

        <el-form-item label="token" prop="token">
            <el-input v-model="formData.token" clearable placeholder="token"></el-input>
        </el-form-item>

        <el-form-item label="加密密钥" prop="aesKey">
            <el-input v-model="formData.aesKey" clearable placeholder="加密密钥"></el-input>
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
