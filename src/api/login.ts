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

/**
 * 登录
 * @param username:any
 * @param password:any
 */
export async function loginAccount(username: any, password: any): Promise<{ code: number, data: { access_token: string, expire: number, uid: string }, error: any }> {
    return await cloud.invokeFunction('admin-login', {
        username: username,
        password: password,
    })
}

export function adminInfo() {
    // noinspection SpellCheckingInspection
    return cloud.invokeFunction<{ error_code: string, data: SysAdmin & { permissions: Array<string> } }>('admin-getinfo', {})
}
