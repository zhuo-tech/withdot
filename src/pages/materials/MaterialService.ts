import { getLogger } from '@/main'
import BasisCrud from '@/mixin/BasisCrud'
import Page from '@/model/Page'
import { StrUtil } from 'typescript-util'
import Material, { FileInfo } from './Material'

/**
 * 素材管理相关
 */
export default class MaterialService extends BasisCrud<Material> {

    private log = getLogger(MaterialService.name)

    protected get formDataDefault(): Material {
        const material = new Material()
        material.href = StrUtil.EMPTY
        material.file = {} as FileInfo
        return material;
    }

    protected pageRequest: (page: Page<Material>, query: Partial<Material>) => Promise<Page<Material>> = async (page, query) => {
        this.log.trace('素材查询: ', {page, query})

        page.total = page.list.length
        return page
    }
    protected createRequest: (data: Partial<Material>) => Promise<any> = async (data) => {
        this.page.list.push(data as any)
        this.log.trace('新增数据...')
    }
    protected updateRequest: (data: Partial<Material>) => Promise<any> = async (data) => {
        this.log.trace('更新数据...', data)
    }
    protected deleteByIdRequest: (id: (string | number)) => Promise<any> = async (id) => {
        this.log.trace('删除: ', id)
    }
}
