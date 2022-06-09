import { cloud } from "@/cloud";
import { HisVodRecord } from "./HisVodRecord";


const DB = cloud.database();
export function PlayNumber() {
    return DB.collection(HisVodRecord.TABLE_NAME)
    .where({})
    .get();
}
