import { cloud } from '@/cloud'

const DB = cloud.database()

/**
 * 获取支付信息
 * @param mobile:any
 * @returns {Promise<any>}
 */
 export async function addPayChannel(data:{}) {
  return await cloud.invokeFunction('send-login-sms', {
      data
  })
}
