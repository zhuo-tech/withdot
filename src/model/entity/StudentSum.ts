import { cloud } from "@/cloud";
import { CoreStudent } from "./CoreStudent";

const DB = cloud.database();
export function studentSum() {
    return DB.collection(CoreStudent.TABLE_NAME)
    .where({})
    .get();
}
