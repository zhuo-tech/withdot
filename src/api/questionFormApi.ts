import { cloud } from '@/cloud'
import { CoreQuestionRepo } from '@/model/entity/CoreQuestionRepo'
import { LogicDelete } from '@/model/LogicDelete'

const DB = cloud.database()

export async function initQuestionList(page:any){
    const totalRes = await DB.collection(CoreQuestionRepo.TABLE_NAME)
        .where({
            delFlag:LogicDelete.NORMAL
        })
        .count()
    if(!totalRes.ok){
        throw new Error(totalRes.error)
    }
    const listRes = await DB.collection(CoreQuestionRepo.TABLE_NAME)
        .where({
            delFlag:LogicDelete.NORMAL
        })
        .page({
            current:page.current,
            size:page.size
        })
        .get()
    if(!listRes.ok){
        throw new Error(listRes.error)
    }
    return {
        total:totalRes.total,
        data:listRes.data
    }
}
