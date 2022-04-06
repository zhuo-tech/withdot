import { cloud } from '@/cloud'
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

export function setToken(token: string, expire: number, userId: number): void {
    localStorage.setItem(kToken, token)
    localStorage.setItem(kTokenExpire, `${ expire }`)
    localStorage.setItem('userId', `${ userId }`)
}

export function clearToken() {
    localStorage.removeItem(kToken)
    localStorage.removeItem(kTokenExpire)
}

export async function getUserInfo() {
    const userId = localStorage.getItem('userId')
    if (!userId) {
        return ElMessage.error('用户不存在')
    }
    const res = await cloud.invokeFunction('get-user-info', {userId})
    if(res.code!==0){
        ElMessage.error(res.error)
    }
    return res.data
}

