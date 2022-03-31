import { loginAccount, mobileSendCode, registerAccount } from '@/api/login'
import { setToken } from '@/api/token'
import { ElMessage, FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'


export const formRefs = reactive({                //登录表单
    username: null,
    password: null,
})
export const checkboxRefs = ref()                        //记住密码
export const loginFormRef = ref<FormInstance>()
/*
登录按钮
 */
export const login = () => {
    loginFormRef.value?.validate(valid => {
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
export const toRegistered = (): void => {
    whetherToRegister.value = true
}

export let whetherToRegister = ref(false)         //是否已经注册
export const registerForm = reactive({                //注册表单
    phone: null,
    verificationCode: null,
    password: null,
})
export const smsCounter = ref(0)                     // 倒计时
export const rules = reactive({
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
export const registerFormRef = ref<FormInstance>()
/*
跳转至登录页
 */
export const register = () => {
    console.log(registerFormRef,'登录1')
    registerFormRef.value?.validate(valid => {
        console.log(registerFormRef,'登录2')
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
export const getVerificationCode = () => {
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
