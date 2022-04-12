import { cloud } from './../../../cloud';
import { PayChannel } from "@/model/entity/PayChannel"

export class PayChannelService{
   
   public async list() :Promise<Array<PayChannel>>{
      const _ = cloud.database()
      const result = await _.collection(PayChannel.TABLE_NAME).get()
      return result?.data 
   }

}