<script lang="ts" setup>
import { Lock, Message, UserFilled } from '@element-plus/icons-vue'
import {
    checkboxRefs,
    formRefs,
    getVerificationCode,
    login,
    loginFormRef as loginFormRefs,
    register,
    registerForm,
    registerFormRef as registerFormRefs,
    rules,
    smsCounter,
    toRegistered,
    whetherToRegister,
} from './loginFun'

const registerFormRef = registerFormRefs
const loginFormRef = loginFormRefs
</script>

<template>
    <!--登录页面-->
    <el-row v-if="!whetherToRegister" >
        <el-col :offset="17" :span="6" class="loginBox">
            <div class="logo"></div>
            <el-form ref="loginFormRef" :model="formRefs" :rules="rules" label-width="55px">
                <el-form-item label="账号:" prop="username">
                    <el-input v-model="formRefs.username" clearable placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                    <el-input v-model="formRefs.password" clearable placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-button round size="large" type="primary" @click="login">登录</el-button>
            </el-form>
            <div class="passwordItem">
                <el-checkbox v-model="checkboxRefs">记住密码</el-checkbox>
                <div class="forgotPassword">忘记密码?</div>
            </div>
            <div class="noAccount">没有账号? 去
                <span @click="toRegistered">注册</span>
            </div>
        </el-col>
    </el-row>

    <!--注册-->
    <el-row v-else >
        <el-col :offset="17" :span="6" class="registerBox">
            <div class="logo"></div>
            <el-form ref="registerFormRef" :model="registerForm" :rules="rules" label-width="0">
                <el-form-item prop="phone">
                    <el-input v-model="registerForm.phone"
                              :prefix-icon="UserFilled"
                              clearable placeholder="请输入手机号" type="number">
                    </el-input>
                </el-form-item>
                <el-form-item prop="verificationCode">
                    <el-row style="width: 100%">
                        <el-col :span="11">
                            <el-input v-model="registerForm.verificationCode"
                                      :prefix-icon="Message"
                                      clearable
                                      placeholder="请输入验证码"
                                      type="number"></el-input>
                        </el-col>
                        <el-col :offset="1" :span="12">
                            <el-button v-if="smsCounter<=0" type="primary" @click="getVerificationCode">获取验证码</el-button>
                            <el-button v-else type="primary">{{ smsCounter }}秒</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="registerForm.password"
                              :prefix-icon="Lock"
                              clearable
                              placeholder="请输入密码"
                              type="password"></el-input>
                </el-form-item>
                <el-button round size="large" type="primary" @click="register">注册</el-button>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="less" scoped>
.loginBox {
    :deep(.el-input__inner) {
        border-radius: 30px;
    }
}


.loginBox,.registerBox {
    width: 319px;
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);
}

.el-button {
    width: 100%;
}

.passwordItem {
    margin: 40px 0;
    display: flex;
    justify-content: space-between;

    .forgotPassword {
        color: #3A62D7;
        font-size: 14px;
        font-family: SourceHanSansSC-regular;
        font-weight: normal;
        cursor: pointer;
    }
}

.noAccount {
    color: #101010;
    font-size: 14px;
    font-family: SourceHanSansSC-regular;
    font-weight: normal;

    > span {
        color: #3A62D7;
        cursor: pointer;
    }
}

.logo {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background-color: #3A62D7;
    margin-bottom: 97px;
}


//去除number输入框的上下控制键
:deep(input::-webkit-outer-spin-button ) {
    -webkit-appearance: none !important;
}

:deep(input::-webkit-inner-spin-button ) {
    -webkit-appearance: none !important;
}

:deep(input [type='number']) {
    -moz-appearance: textfield !important;
}
</style>
