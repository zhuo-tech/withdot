const kToken = 'access_token'
const kTokenExpire = 'access_token'

export function getToken(): string {
    const expire = localStorage.getItem(kTokenExpire)
    if (Number(expire) <= Date.now() / 1000) {
        clearToken()
        return ''
    }

    const token = localStorage.getItem(kToken) || ''
    return token
}

export function setToken(token: string, expire: number) {
    localStorage.setItem(kToken, token)
    localStorage.setItem(kTokenExpire, `${ expire }`)
}

export function clearToken() {
    localStorage.removeItem(kToken)
    localStorage.removeItem(kTokenExpire)
}
