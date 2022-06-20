import { cloud } from '@/cloud'
import { CoreAlbum, CoreAlbumWork } from '@/model/entity/CoreAlbum'
import { CoreWork } from '@/model/entity/CoreWork'
import { HisVodRecord } from '@/model/entity/HisVodRecord'
import { PayGoodsOrder } from '@/model/entity/PayGoodsOrder'
import { SysUser } from '@/model/entity/SysUser'
import { LogicDelete } from '@/model/LogicDelete'
import { ElMessage, TabsPaneContext } from 'element-plus'
import { reactive } from 'vue'

const DB = cloud.database()

export default class StudentService {
    //搜索框数据 显示 隐藏
    public queryData = reactive<QueryDataType>({
        visible: true,
        label: '',
        isPay: '0',
        show() {
            this.visible = true
        },
        close() {
            this.visible = false
        },
        init() {
            this.label = ''
        },
    })
    //表格数据
    public tableData = reactive<TableDataType>({
        tableIsLoading: false,
        currentTab: '0',
        list: [],
        payList: [],
        page: {
            current: 1,
            size: 5,
            total: 100,
        },
    })
    //详情
    public detail = reactive<DetailType>({
        data: {} as any,
        watchHistoryPage: {
            current: 1,
            size: 5,
            total: 100,
        },
        visible: false,
        collapseActiveName: '1',
        show() {
            this.visible = true
        },
        close() {
            this.visible = false
        },

    })
    private userId = reactive<any>('') as any

    public pageSizeChange = (val: any) => {
        this.tableData.page.size = val
        this.getTableList()
    }

    public currentPageChange = (val: any) => {
        this.tableData.page.current = val
        this.getTableList()
    }

    public watchHistoryPageSizeChange = async (val: any) => {
        this.detail.watchHistoryPage.size = val
        await this.watchHistoryFn()

    }

    public watchHistoryCurrentPageChange = async (val: any) => {
        this.detail.watchHistoryPage.current = val
        await this.watchHistoryFn()

    }

    /**
     * 切换tabs
     */
    public tabClick = (pane: TabsPaneContext) => {
        this.tableData.currentTab = pane.index as string
        this.getTableList()
    }

    /**
     * 查看详情
     */
    public handleClick = async (id: string) => {
        this.userId = id
        this.detail.show()
        try {
            const detailRes = await this.getDetailApi(id)
            this.detail.data = detailRes.detailData
            await this.watchHistoryFn()
            console.log('学生详情', this.detail.data)

        } catch (err: any) {
            ElMessage.error(err)
        }
    }

    public getTableList = () => {
        this.tableData.list = []
        this.tableData.page.total = 0
        this.tableData.tableIsLoading = true
        this.getTableDataApi(this.tableData.page, this.queryData).then((response: any) => {
            this.tableData.list = response.data
            this.tableData.page.total = response.total
            this.tableData.tableIsLoading = false
        }).catch((err: any) => {
            ElMessage.error(err)
        })
    }

    public async getStudentWatchHistory(userId: string) {
        const countRes = await DB.collection(HisVodRecord.TABLE_NAME)
            .where({userId})
            .count()
        if (!countRes.ok) {
            throw new Error(countRes.error)
        }

        const res = await DB.collection(HisVodRecord.TABLE_NAME)
            .where({userId})
            .withOne({
                query: DB.collection(CoreAlbum.TABLE_NAME)
                    .field({
                        title: 1,
                    }),
                localField: 'albumId',
                foreignField: '_id',
                as: 'albumName',
            })
            .withOne({
                query: DB.collection(CoreWork.TABLE_NAME)
                    .field({
                        name: 1,
                    }),
                localField: 'workId',
                foreignField: '_id',
                as: 'workName',
            })
            .page({
                current: this.detail.watchHistoryPage.current,
                size: this.detail.watchHistoryPage.size,
            })
            .get()
        if (!res.ok) {
            throw new Error(res.error)
        }
        return {
            res: res.data,
            total: countRes.total,
        }
    }

    private async watchHistoryFn() {
        const schedulesRes = await this.getStudentWatchHistory(this.userId)
        this.detail.data.schedules = schedulesRes.res
        this.detail.watchHistoryPage.total = schedulesRes.total
    }

    /**
     * 获得表格数据api
     * @param isPay 免费/付费
     * @param page  分页信息
     * @param params 搜索信息
     * @returns {Promise<{total: number, data: any[]}>}
     * @private
     */
    private async getTableDataApi(page: any, params: any) {
        const whereFlag = {
            isPay: this.queryData.isPay,
            username: new RegExp(`.*${this.queryData.label}.*`)
        }

        const totalRes = await DB.collection(SysUser.TABLE_NAME)
            .where(whereFlag)
            .count()
        if (!totalRes.ok) {
            throw new Error(totalRes.error)
        }
        const listRes = await DB.collection(SysUser.TABLE_NAME)
            .where(whereFlag)
            .page({
                current: page.current,
                size: page.size,
            })
            .orderBy('lastLoginTime', 'desc')
            .get()
        if (!listRes.ok) {
            throw new Error(listRes.error)
        }
        return {
            data: listRes.data,
            total: totalRes.total,
        }
    }

    private async getDetailApi(id: string) {
        const detailRes = await DB.collection(SysUser.TABLE_NAME)
            .where({
                _id: id,
            })
            .getOne()
        if (!detailRes.ok) {
            throw new Error(detailRes.error)
        }
        const payRes = await DB.collection(PayGoodsOrder.TABLE_NAME)
            .where({
                userId: id,
                delFlag: LogicDelete.NORMAL,
            })
            .orderBy('createTime', 'desc')
            .get()
        if (!payRes.ok) {
            throw new Error(payRes.error)
        }
        return {
            detailData: {
                ...detailRes.data,
                payData: payRes.data,
            },
        }
    }
}

export const StatusType = {
    '0': '订单生成',
    '1': '支付成功',
    '2': '处理完成',
    '-1': '处理失败',
}

export const StudyType = {
    '0': '完成',
    '1': '未完成',
}

type TableDataType = {
    tableIsLoading: Boolean,
    currentTab: string,
    list: [],
    payList: [],
    page: PageType
}

type PageType = {
    current: number,
    size: number,
    total: number
}

type DetailType = {
    data: SysUser,
    visible: Boolean,
    collapseActiveName: string,
    watchHistoryPage: PageType
    show(): void,
    close(): void
}

type QueryDataType = {
    visible: Boolean,
    label: string,
    isPay: string,
    show(): void,
    close(): void,
    init(): void
}
