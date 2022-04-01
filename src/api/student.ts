import { cloud } from '@/cloud'
import { CoreStudent } from '@/model/entity/CoreStudent'

const DB = cloud.database()

export const studentType = {
    isPay: 0,
    noPay: 1,
}

function verify(params: Record<string, any>) {
    const res: Record<any, any> = {}
    const {type, name} = params
    if (type !== undefined) {
        res.isPay = type
    }
    if (name !== undefined) {
        res.name = new RegExp(`.*${name}.*`)
    }
    return res
}

/**
 * 获得学员列表
 */
export async function getStudentListInit(params: Record<string, any>) {
    const query = verify(params)
    return await DB.collection('core_student')
        .where(query)
        .orderBy('createTime', 'desc')
        .get<CoreStudent>()
}

