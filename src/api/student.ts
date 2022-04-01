import { cloud } from '@/cloud'
import { CoreStudent } from '@/model/entity/CoreStudent'

const DB = cloud.database()

export const studentType = {
    isPay: 0,
    noPay: 1,
}

/**
 * 获得学员列表
 */
export async function getStudentListInit(type: number) {
  return await DB.collection('core_student')
      .where({
          isPay:type
      })
      .get<CoreStudent>()
}
