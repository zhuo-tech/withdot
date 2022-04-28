<script lang="ts" setup>
import { adminInfo, loginAccount } from '@/api/login'
import { setToken } from '@/api/token'
import { Lock, Message, UserFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import {
    checkboxRefs,
    formRefs,
    getVerificationCode,
    loginFormRef as loginFormRefs,
    register,
    registerForm,
    registerFormRef as registerFormRefs,
    rules,
    smsCounter,
    toRegistered,
    whetherToRegister,
    toFormRefs
} from './loginFun'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const registerFormRef = registerFormRefs
const loginFormRef = loginFormRefs

/*
 登录按钮
 */
const login = () => {
    loginFormRef.value?.validate(valid => {
        if (valid) {
            const {username, password} = formRefs
            loginAccount(username, password).then(response => {
                if (response.code !== 0) {
                    ElMessage.error(response.error)
                    return
                }
                const {access_token, expire} = response.data
                setToken(access_token, expire, '')
                ElMessage.success('登录成功')

                // TODO: 临时措施, 补全UID
                adminInfo().then(({data: {_id}}) => setToken(access_token, expire, _id))

            }).catch(err => {
                ElMessage.error(err)
            }).finally(() => {
                if (!route.redirectedFrom) {
                    router.push('/')
                    return
                }
                router.push(route.redirectedFrom.path)
            })
        }
    })

}
</script>

<template>
<!--登录页面-->
<div class="box">
<el-row v-if="!whetherToRegister">
    <el-col :offset="17" :span="6" class="loginBox">
      <div class="title">登录</div>
                <div class="hint">请输入用户信息</div>
        <el-form ref="loginFormRef" :model="formRefs" :rules="rules" label-width="55px">
            <el-form-item  class="input"   prop="username">
                <el-input v-model="formRefs.username" clearable placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item class="input"   prop="password">
                <el-input v-model="formRefs.password" clearable placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-button class="login-but" round size="large" type="primary" @click="login">登录</el-button>
        </el-form>
        <!-- <div class="passwordItem">
            <el-checkbox v-model="checkboxRefs">记住密码</el-checkbox>
            <div class="forgotPassword">忘记密码?</div>
        </div>
        <div class="noAccount">没有账号? 去
            <span @click="toRegistered">注册</span>
        </div> -->
    </el-col>
</el-row>


<!--注册-->
<!-- <el-row v-else>


    <el-col :offset="17" :span="6" class="registerBox">
        <div style="cursor:pointer" @click="toFormRefs"><el-icon :size = 30 color="#f4f4f5" ><back/></el-icon></div>
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
</el-row> -->
</div>

</template>

<style lang="less" scoped>
.box {
    width: 100%;
    height: 100vh;
    background: url('../../assets/loginbj.png') no-repeat;
    background-size: 100% 100%;
}

.loginBox {
    background-color: #fff;

    :deep(.el-input__inner) {
        border-radius: 30px;
    }

    .title {
        width: 72px;
        height: 48px;
        font-weight: 700;
        font-size: 36px;
        margin: 30px 0 0 33px;
        color: rgba(51, 51, 51, 1);
    }

    .hint {
        width: 105px;
        height: 20px;
        font-size: 15px;
        margin: 10px 0 32px 33px;
        color: rgba(152, 159, 188, 1);
    }

    .input {
        width: 90%;
        margin-bottom: 20px;
    }

    .login-but {
        width: 80%;
        margin-left:50px;
        background-color: #3348f7;
    }
}



.loginBox,
.registerBox {
    width: 426px;
    height: 360px;
    border-radius: 30px;
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);
}



.el-button {
    width: 100%;
}

.passwordItem {
    margin: 20px 0 0 33px;
    display: flex;
    justify-content: space-between;

    .forgotPassword {
       margin: 6px 33px 0 0px;
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
    margin: 10px 0 0 33px;

    >span {
        color: #3A62D7;
        cursor: pointer;
    }
}




//去除number输入框的上下控制键
:deep(input::-webkit-outer-spin-button) {
    -webkit-appearance: none !important;
}

:deep(input::-webkit-inner-spin-button) {
    -webkit-appearance: none !important;
}

:deep(input [type='number']) {
    -moz-appearance: textfield !important;
}
</style>
