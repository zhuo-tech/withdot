import { cloud } from '@/cloud'
import { SysUser } from '@/model/entity/SysUser'
import { ElMessage } from 'element-plus'

const kToken = 'access_token'
const kTokenExpire = 'access_token_expire'

export function getToken(): string {
    const expire = localStorage.getItem(kTokenExpire)
    if (Number(expire) <= Date.now() / 1000) {
        clearToken()
        return ''
    }

    const token = localStorage.getItem(kToken) || ''
    return token
}

export function setToken(token: string, expire: number, userId: string): void {
    localStorage.setItem(kToken, token)
    localStorage.setItem(kTokenExpire, `${ expire }`)
    localStorage.setItem('userId', `${ userId }`)
}

export function getUserId(): string {
    const userId = localStorage.getItem('userId')
    if (!userId) {
        ElMessage.error('用户不存在')
        return ''
    }
    return userId
}

export function clearToken() {
    localStorage.removeItem(kToken)
    localStorage.removeItem(kTokenExpire)
}

export async function getUserInfo(): Promise<SysUser | null> {
    const userId = localStorage.getItem('userId')
    if (!userId) {
        ElMessage.error('用户不存在')
        return null
    }
    const res = await cloud.invokeFunction<{code: number, error: string, data: SysUser}>('get-user-info', {userId})
    if (res.code !== 0) {
        ElMessage.error(res.error)
    }
    return res.data
}

export async function getOssSign(fileName: string,bucketName: string) {
   return await cloud.invokeFunction('get-oss-sign-url',{fileName,bucketName})
}
