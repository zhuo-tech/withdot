import { cloud } from './../../../cloud';
import { PayTradeOrder } from "@/model/entity/PayTradeOrder"

export class PayTradeOrderService{
   
   public async list() :Promise<Array<PayTradeOrder >>{
      const _ = cloud.database()
      const result = await _.collection(PayTradeOrder .TABLE_NAME).get()
      return result?.data 
   }

}