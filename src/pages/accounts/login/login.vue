<script lang="ts" setup>
import { useLogin } from '@/pages/accounts/login/useLogin'
import { FormInstance } from 'element-plus'
import { Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const loginFormRef: Ref<FormInstance> = ref({} as any)
const {loginFormData, submit, formRule, isLoading} = useLogin(loginFormRef, useRouter(), useRoute())

</script>

<template>
<!--登录页面-->
<div class="box">
    <div v-loading="isLoading" class="loginBox">
        <div class="title">登录</div>
        <div class="hint">请输入用户信息</div>
        <el-form ref="loginFormRef" :model="loginFormData" :rules="formRule" label-width="55px">
            <el-form-item class="input" prop="username">
                <el-input v-model="loginFormData.username" clearable placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item class="input" prop="password">
                <el-input v-model="loginFormData.password" clearable placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-button class="login-but" round size="large" type="primary" @click="submit">登录</el-button>
        </el-form>
    </div>
</div>
</template>

<style lang="less" scoped src="./loginStyle.less"></style>
