import { cloud } from "../cloud"
import { CloudFunctionResult } from "../types"


export async function login(username: string, password: string) {
  const res = await cloud.invokeFunction<CloudFunctionResult>('admin-login', { username, password})
  return res
}
