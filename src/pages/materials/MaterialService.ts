import Page from '../../model/Page'
import BasisCrudPageService from '../../mixin/BasisCrudPageService'

class Material {
    _id: string
    title: string
    href: string
    size: number
    tag: Array<string>
    createTime: number
    updateTime: number
    createBy: string
    updateBy: string
}

/**
 * 素材管理相关
 */
export default class MaterialService extends BasisCrudPageService<Material> {

    protected pageRequest: (page: Page<Material>, query: Partial<Material>) => Promise<Page<Material>> = async (page, query) => {
        console.debug('素材查询: ', {page, query})

        page.total = page.list.length
        return page
    }
    protected createRequest: (data: Partial<Material>) => Promise<any> = async (data) => {
        this.page.list.push(data as any)
    }
    protected updateRequest: (data: Partial<Material>) => Promise<any> = async (data) => {

    }
    protected deleteByIdRequest: (id: (string | number)) => Promise<any> = async (id) => {

    }
}
