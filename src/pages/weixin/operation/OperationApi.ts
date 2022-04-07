import { GetRes } from 'database-ql/src/result-types'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'

export default class OperationApi {

    public queryData = ref()
    public publicNameList = ref()
    public isActive = ref()
    protected publicRequest: (query: string) => Promise<GetRes<any>>

    public publicList = () => {
        this.publicRequest(this.queryData.value)
            .then(response => {
                if (!response.ok) {
                    ElMessage.error(response.error)
                }
                if (response.data.length > 0) {
                    this.publicNameList.value = response.data
                }
            })
            .catch(err => {
                ElMessage.error(err)
            })
    }

    public changeStyle = (id: any) => {
        this.isActive.value = id
    }
}
