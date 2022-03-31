<script lang="ts" setup>
import { loginAccount, mobileSendCode, registerAccount } from '@/api/login'
import { setToken } from '@/api/token'
import { Lock, Message, UserFilled } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'

let whetherToRegister = ref(false)         //是否已经注册
const formRefs = reactive({                //登录表单
    username: null,
    password: null,
})
const checkboxRefs = ref()                        //记住密码
const formRef = ref<FormInstance>()
/*
登录按钮
 */
const login = () => {
    if (!formRef) {
        return
    }
    formRef.value?.validate(valid => {
        if (valid) {
            const {username, password} = formRefs
            loginAccount(username, password).then(response => {
                if (response.code !== 0) {
                    ElMessage.error(response.error)
                    return
                }
                const {access_token, expire} = response.data
                setToken(access_token, expire)
                ElMessage.success('登录成功')
            }).catch(err => {
                ElMessage.error(err)
            })
        }
    })

}

/*
跳转至注册页
 */
const toRegistered = (): void => {
    whetherToRegister.value = true
}

/*注册页*/

const registerForm = reactive({                //注册表单
    phone: null,
    verificationCode: null,
    password: null,
})
const smsCounter = ref(0)                     // 倒计时
const rules = reactive({
    phone: [
        {required: true, message: '手机号不能为空', trigger: 'blur'},
        {pattern: /^1[356789]\d{9}$/, message: '手机号格式有误!', trigger: 'blur'},
    ],
    verificationCode: [
        {required: true, message: '验证码不能为空', trigger: 'blur'},
    ],
    password: [
        {required: true, message: '密码不能为空', trigger: 'blur'},
    ],
    username: [
        {required: true, message: '用户名不能为空', trigger: 'blur'},
    ],
})
const form = ref<FormInstance>()

/*
跳转至登录页
 */
const register = () => {
    if (!form) {
        return
    }
    form.value?.validate(valid => {
        if (valid) {
            const {phone, verificationCode: code, password} = registerForm
            registerAccount(phone, code, password).then(response => {
                if (response.code !== 0) {
                    ElMessage.error(response.error)
                    return
                }
                ElMessage.success('注册成功')
            }).catch(err => {
                ElMessage.error(err)
            })
            whetherToRegister.value = false
            smsCounter.value = 0
        }
    })

}

/*
获取验证码
 */
const getVerificationCode = () => {
    if (!registerForm.phone) {
        ElMessage('请填写手机号')
        return
    }
    timerTicker()
    mobileSendCode(registerForm.phone).then(response => {
    }).catch(err => {
        ElMessage.error(err)
    })
}

/*
倒计时
 */
const timerTicker = () => {
    smsCounter.value = 60
    const timing = setInterval(() => {
        if (smsCounter.value <= 0) {
            clearInterval(timing)
        }
        smsCounter.value--
    }, 1000)
}

</script>

<template>
    <!--登录页面-->
    <el-row v-if="!whetherToRegister" class="loginBox">
        <el-col :offset="17" :span="6">
            <div class="logo"></div>
            <el-form ref="formRef" :model="formRefs" :rules="rules" label-width="55px">
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
    <el-row v-else class="registerBox">
        <el-col :offset="17" :span="6">
            <div class="logo"></div>
            <el-form ref="form" :model="registerForm" :rules="rules" label-width="0">
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
                <el-button round size="large" type="primary" @click="register()">注册</el-button>
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


.loginBox {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
}

.registerBox {
    position: relative;
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
