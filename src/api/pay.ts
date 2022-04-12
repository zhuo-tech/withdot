import { cloud } from '@/cloud'

const DB = cloud.database()

/**
 * 获取短信验证
 * @param mobile:any
 * @returns {Promise<any>}
 */
 export async function addPayChannel(data:{}) {
  return await cloud.invokeFunction('send-login-sms', {
      data
  })
}
