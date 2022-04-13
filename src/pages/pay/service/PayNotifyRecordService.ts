import { cloud } from './../../../cloud';
import { PayNotifyRecord } from "@/model/entity/PayNotifyRecord"

export class PayNotifyRecordService{
   
   public async list() :Promise<Array<PayNotifyRecord >>{
      const _ = cloud.database()
      const result = await _.collection(PayNotifyRecord .TABLE_NAME).get()
      return result?.data 
   }

}