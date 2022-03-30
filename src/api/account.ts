import { cloud } from '../cloud'
import { CloudFunctionResult } from '../types'

export async function login(username: string, password: string) {
    return await cloud.invokeFunction<CloudFunctionResult>('admin-login', {username, password})
}
