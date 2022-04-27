import { getLogger } from '@/main'
import { filterTime } from '@/utils/utils'
import { ElMessage } from 'element-plus/lib/components/index'
import { Page } from 'laf-db-query-wrapper'
import { reactive, Ref, ref, unref, UnwrapNestedRefs } from 'vue'

export type PageRequest<T> = (page: Page<T>, query: Partial<T>) => Promise<Page<T>>

export type CreateRequest<T, R = any> = (data: Partial<T>) => Promise<R>

export type UpdateRequest<T, R = any> = (data: Partial<T>) => Promise<R>

export type DeleteRequest<T, R = any> = (data: Partial<T>) => Promise<R>

export interface Request<T> {
    page: PageRequest<T>
    create?: CreateRequest<T>
    update?: UpdateRequest<T>
    del?: DeleteRequest<T>
}

type TableInitConfig<T> = {
    page?: Page<T>
    queryData?: Partial<T>
}

export type TableListReturn<T> = {
    currentPageChange(current: number): void
    execDelete(data: Partial<T>): void
    getPageList(): void
    isLoading: Ref<boolean>
    page: Page<T>
    pageSizeChange(size: number): void
    queryData: UnwrapNestedRefs<Partial<T>>
    queryIsShow: Ref<boolean>
    toggleQueryForm(): void
}

const log = getLogger('useTableList')

/**
 *
 * @param {Request<T>} request
 * @param {TableInitConfig<T>} init
 * @param {boolean} exec
 * @returns {TableListReturn<T>}
 */
export function useTableList<T>(request: Request<T>, init?: TableInitConfig<T>, exec: boolean = true): TableListReturn<T> {
    const isLoading: Ref<boolean> = ref(false)
    const queryIsShow: Ref<boolean> = ref(false)

    const page: Page<T> = reactive(init?.page ?? new Page<T>(1, 20)) as any
    const queryData: UnwrapNestedRefs<Partial<T>> = reactive<Partial<T>>(init?.queryData ?? {})

    const getPageList = () => {
        isLoading.value = true
        request.page(unref(page) as any, unref(queryData))
            .then(({list, total}) => {
                page.list = list.map(i => formatTime(i))
                page.total = total
            })
            .catch(err => {
                log.debug('getPageList Error: ', err)
                ElMessage.error(err?.toString())
            })
            .finally(() => isLoading.value = false)
    }

    const execDelete = (data: Partial<T>) => {
        if (!request?.del) {
            log.warn('request.del 不存在')
        }
        request.del?.(data)
            .then(() => {
                log.debug('删除完成')
                getPageList()
            })
            .catch(err => {
                log.debug('execDelete Error: ', err)
                ElMessage.error(err?.toString())
            })

    }

    const pageSizeChange = (size: number) => {
        page.pageSize = size
        getPageList()
    }

    const currentPageChange = (current: number) => {
        page.currentPage = current
        getPageList()
    }

    const toggleQueryForm = () => {
        queryIsShow.value = !queryIsShow.value
    }

    // 立即执行
    if (exec) {
        getPageList()
    }

    return {
        page,
        isLoading,
        queryIsShow,
        queryData,
        toggleQueryForm,
        getPageList,
        pageSizeChange,
        currentPageChange,
        execDelete,
    }
}

const PROCESSING_TIME = [
    'createTime',
    'updateTime',
    'created_at',
    'updated_at',
]

function formatTime(o: any) {
    Object.keys(o).forEach(key => {
        if (!PROCESSING_TIME.includes(key)) {
            return
        }

        let value = o[key]
        if (value && typeof value === 'number') {
            o[key] = filterTime(value)
        }
    })
    return o
}
