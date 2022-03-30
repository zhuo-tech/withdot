import { RuleItem } from 'async-validator'
import { reactive, Ref, ref } from 'vue'
import Page from '../model/Page'
import { useRoute } from 'vue-router'

export default class BasisCrudPageService<E> {

    protected pageRequest: (page: Page<E>, query: Partial<E>) => Promise<Page<E>>
    protected createRequest: (data: Partial<E>) => Promise<any>
    protected updateRequest: (data: Partial<E>) => Promise<any>
    protected deleteByIdRequest: (id: string | number) => Promise<any>

    public get formDataDefault(): E {
        return {} as E
    }

    public readonly matchedRoute = useRoute().matched
    public readonly rowKey: string = '_id'
    public showQuery: Ref<boolean> = ref(false)
    public queryData: Partial<E> = reactive({})
    // @ts-ignore
    public page: Page<E> = reactive(new Page<E>())
    public tableIsLoading: Ref<boolean> = ref(false)

    public isShow: Ref<boolean> = ref(false)
    public formData: Partial<E> = reactive(this.formDataDefault as any)
    public formIsAdd: Ref<boolean> = ref(false)
    public formIsLoading: Ref<boolean> = ref(false)
    public formRule: Partial<Record<keyof E, Array<RuleItem>>> = reactive({})


    /**
     * 表格数据
     */
    public listUpdate = () => {
        this.tableIsLoading.value = true
        this.pageRequest(this.page as any, this.queryData as any)
            .then(page => {
                this.page = page
                console.debug('THIS', this)
            })
            .catch(err => console.debug(err))
            .finally(() => this.tableIsLoading.value = false )
    }

    public queryFormSubmit = () => {
        this.listUpdate()
    }

    /**
     * 表单提交按钮回调事件
     * - 调用提交接口方法 {@link createRequest} 或 {@link updateRequest}
     * - 处理表单加载状态
     * - 重置表单默认值
     */
    public formSubmit = () => {
        console.debug('表单提交: ', this.formIsAdd ? '新增' : '编辑', this.formData)
        const submitAction = () => (this.formIsAdd ? this.createRequest :  this.updateRequest)

        this.formIsLoading.value = true
        submitAction()(this.formData)
            .then(() => {
                console.debug('表单提交完成')
                this.close()
                this.listUpdate()

                this.formData = this.formDataDefault
            })
            .catch(err => console.debug('表单提交错误', err))
            .finally(() => this.formIsLoading.value = false)
    }

    /**
     * 新增按钮回调事件
     */
    public readyAdd = () => {
        this.formData = this.formDataDefault
        this.formIsAdd.value = true
        this.show()
    }

    /**
     * 编辑按钮回调事件, 需要传入当前行的数据
     * @param {E} data 一行数据
     */
    public readyEdit = (data: E) => {
        this.formData = data
        this.formIsAdd.value = false
        this.show()
    }

    /**
     * 删除按钮回调事件, 需要传入当前行的数据
     * @param {E} data 一行数据
     */
    public readyDelete = (data: E) => {
        console.debug('删除提交: ', data)

        this.deleteByIdRequest(data[this.rowKey])
            .then(() => {
                console.debug('删除完成')
                this.listUpdate()
            })
            .catch(err => console.log('删除失败', err))
    }

    public show = () => {
        this.isShow.value = true
    }

    public close = () => {
        this.isShow.value = false
    }

    public pageSizeChange = (size: number) => {
        this.page.size = size
        this.listUpdate()
    }

    public currentPageChange = (current: number) => {
        this.page.current = current
        this.listUpdate()
    }
}
