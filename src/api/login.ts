import { cloud } from '@/cloud'
import { SysAdmin } from '@/model/entity/SysAdmin'

/**
 * 获取短信验证
 * @param mobile:any
 * @returns {Promise<any>}
 */
export async function mobileSendCode(mobile: any) {
    return await cloud.invokeFunction('send-login-sms', {
        phone: mobile,
    })
}

/**
 * 注册
 * @param phone:any
 * @param code:any
 * @param password:any
 */
export async function registerAccount(phone: any, code: any, password: any) {
    return await cloud.invokeFunction('register-an-account', {
        phone: phone,
        code: code,
        password: password,
    })
}

type LoginFailureRes = { code: string, msg: string }
type LoginSuccessRes = {
    code: 0,
    data: {
        access_token: string
        expire: number
        uid: string
    }
}

/**
 * 登录
 */
export async function loginAccount(data: { username: string, password: string }): Promise<LoginSuccessRes['data']> {
    const res = await cloud.invokeFunction<LoginFailureRes | LoginSuccessRes>('admin-login', data)
    if (res.code !== 0) {
        throw new Error(res.msg)
    }

    return res.data
}

export async function adminInfo() {
    // noinspection SpellCheckingInspection
    const res = await cloud.invokeFunction<{ error_code: string, error: string, data: SysAdmin & { permissions: Array<string> } }>('admin-getinfo', {})
    if (res.error_code !== '0') {
        throw new Error(res.error)
    }
    return res.data
}
