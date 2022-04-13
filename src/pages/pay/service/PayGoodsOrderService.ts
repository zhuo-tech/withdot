import { cloud } from './../../../cloud';
import { PayGoodsOrder } from "@/model/entity/PayGoodsOrder"

export class PayGoodsOrderService{
   
   public async list() :Promise<Array<PayGoodsOrder >>{
      const _ = cloud.database()
      const result = await _.collection(PayGoodsOrder .TABLE_NAME).get()
      return result?.data 
   }

}