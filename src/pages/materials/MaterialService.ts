import { getLogger } from '@/main'
import BasisCrud from '@/mixin/BasisCrud'
import { FileInfo } from '@/model/FileInfo'
import Page from '@/model/Page'
import { StrUtil } from 'typescript-util'
import CoreMaterial from '@/model/entity/CoreMaterial'

/**
 * 素材管理相关
 */
export default class MaterialService extends BasisCrud<CoreMaterial> {

    private log = getLogger(MaterialService.name)

    protected get formDataDefault(): CoreMaterial {
        const material = new CoreMaterial()
        material.href = StrUtil.EMPTY
        material.file = {} as FileInfo
        return material;
    }

    protected pageRequest: (page: Page<CoreMaterial>, query: Partial<CoreMaterial>) => Promise<Page<CoreMaterial>> = async (page, query) => {
        this.log.trace('素材查询: ', {page, query})

        page.total = page.list.length
        return page
    }
    protected createRequest: (data: Partial<CoreMaterial>) => Promise<any> = async (data) => {
        this.page.list.push(data as any)
        this.log.trace('新增数据...')
    }
    protected updateRequest: (data: Partial<CoreMaterial>) => Promise<any> = async (data) => {
        this.log.trace('更新数据...', data)
    }
    protected deleteByIdRequest: (id: (string | number)) => Promise<any> = async (id) => {
        this.log.trace('删除: ', id)
    }
}
