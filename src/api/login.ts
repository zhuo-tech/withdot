import { cloud } from '@/cloud'

const DB = cloud.database()

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
        password: password
    })
}

/**
 * 登录
 * @param username:any
 * @param password:any
 */
export async function  loginAccount(username:any,password:any){
    return await cloud.invokeFunction('app-login-password',{
        username:username,
        password:password
    })
}
