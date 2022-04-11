import { getLogger } from '@/main'
import CoreMaterial from '@/model/entity/CoreMaterial'
import { CoreWork } from '@/model/entity/CoreWork'
import { LafClient, QueryChainWrapper } from 'laf-db-query-wrapper'
import { ObjectUtil } from 'typescript-util'
import { Ref, ref } from 'vue'


type DataType = CoreWork & {material: CoreMaterial}

/**
 * 作品编辑
 * @author LL
 * @date 2022年04月11日 11点28分
 */
export class WorkEditorContext {
    private readonly client = new LafClient<CoreWork>(CoreWork.TABLE_NAME)
    private readonly log = getLogger(WorkEditorContext.name)
    /**
     * 作品ID
     */
    private readonly workId: string
    /**
     * 作品数据
     */
    public workData: Ref<DataType> = ref({} as any)

    public workDataIsLoading: Ref<boolean> = ref(false)

    constructor(workId: string) {
        this.workId = workId
        this.init()
    }

    private init() {
        this.workDataIsLoading.value = true

        const withArg = new QueryChainWrapper<CoreMaterial>(CoreMaterial.TABLE_NAME)
            .getWithArg<CoreWork>('_id', 'material_id', 'material')

        this.client.queryWrapper()
            .eq('_id', this.workId)
            .withOne(withArg)
            .one()
            .then(work => {
                this.log.trace('初始化数据: ', work)
                if (ObjectUtil.isEmpty(work)) {
                    this.log.warn('无效的ID: ', this.workId)
                    // 也许需要路由退出?
                    return
                }
                this.workData.value = <DataType>work
            })
            .catch(err => this.log.error(err))
            .finally(() => this.workDataIsLoading.value = false)
    }

}
