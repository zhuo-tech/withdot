import { getUserInfo } from '@/api/token'
import { getLogger } from '@/main'
import BasisCrud from '@/mixin/BasisCrud'
import CoreMaterial from '@/model/entity/CoreMaterial'
import { RuleItem } from 'async-validator'
import { LafClient, Page } from 'laf-db-query-wrapper'
import { ObjectUtil } from 'typescript-util'
import { ref, Ref } from 'vue'

/**
 * 素材管理相关
 */
export default class MaterialService extends BasisCrud<CoreMaterial> {

    private log = getLogger(MaterialService.name)
    private client = new LafClient<CoreMaterial>(CoreMaterial.TABLE_NAME)
    /**
     * 表单选择标签时的数据源
     */
    public tagOption: Ref<Array<string>> = ref([])

    public formRule: Partial<Record<keyof CoreMaterial, Array<RuleItem>>> = {
        title: [{type: 'string', max: 128, min: 1, message: '不能为空, 最多128字符', trigger: 'blur', required: true}],
        tag: [{type: 'array', message: '不能为空', trigger: 'blur', required: false}],
        file: [{type: 'object', message: '请上传', trigger: 'blur', required: true}],
    }

    protected get formDataDefault(): CoreMaterial {
        return new CoreMaterial()
    }

    protected pageRequest: (page: Page<CoreMaterial>, query: Partial<CoreMaterial>) => Promise<Page<CoreMaterial>> = async (page, query) => {
        this.log.trace('素材查询: ', {page, query})
        const resPage = await this.client.queryWrapper()
            .likeNotEmpty('title', query?.title)
            .inNotEmpty('tag', query.tag)
            .whereCmd((action) => {
                if (ObjectUtil.isNotNull(query.type)) {
                    action.type = new RegExp(`^${query.type}`)
                }
                return action;
            })
            .hide('updateBy', 'updateTime', 'createBy')
            .orderByDesc('createTime')
            .page(page)

        // 维护标签
        resPage.list.forEach(i => i.tag.forEach(tag => {
            if (!this.tagOption.value.includes(tag)) {
                this.tagOption.value.push(tag)
            }
        }))

        return resPage
    }
    protected createRequest: (data: Partial<CoreMaterial>) => Promise<any> = async (data) => {
        data.createTime = Date.now()
        data.updateTime = Date.now()
        data.createBy = await this.getCurrentUid()

        return await this.client.insert(data)
    }

    private async getCurrentUid() {
        return (await getUserInfo())?._id
    }

    protected updateRequest: (data: Partial<CoreMaterial>) => Promise<any> = async (data) => {
        data.updateTime = Date.now()
        data.updateBy = await this.getCurrentUid()

        return await this.client.updateById(data._id as string, data, '_id')
    }
    protected deleteByIdRequest: (id: (string | number)) => Promise<any> = async (id) => {
        return await this.client.deleteById(id)
    }
}
