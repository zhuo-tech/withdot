import { loginAccount } from '@/api/login'
import { setToken } from '@/api/token'
import { useUserStore } from '@/store/user'
import { ElMessage, FormInstance } from 'element-plus'
import { reactive, ref, Ref, unref } from 'vue'
import { RouteLocationNormalizedLoaded, Router } from 'vue-router'

type FormDataType = Partial<{ username: string, password: string }>

const formRule: FormValidationRules<FormDataType> = {
    password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
    username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
}

export function useLogin(loginFormRef: Ref<FormInstance>, router: Router, route: RouteLocationNormalizedLoaded) {
    const isLoading = ref(false)
    const loginFormData = reactive<FormDataType>({})

    const login = () => {
        isLoading.value = true
        loginAccount(unref(loginFormData) as any)
            .then(({access_token, expire, uid}) => {
                setToken(access_token, expire, uid)
                useUserStore().update()

                return router.push(route.redirectedFrom ? route.redirectedFrom.path : '/')
            })
            .then(() => ElMessage.success('登录成功'))
            .catch(err => {
                console.debug('登录失败', err)
                ElMessage.error(err)
                isLoading.value = false
            })
    }

    return {
        isLoading,
        formRule,
        loginFormData,
        submit() {
            loginFormRef.value?.validate()
                .then(login)
                .catch(err => console.debug('表单验证失败', err))
        },
    }
}
