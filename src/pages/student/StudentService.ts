// noinspection JSMethodCanBeStatic

import { cloud } from '@/cloud'
import { CoreStudent } from '@/model/entity/CoreStudent'
import { PayGoodsOrder } from '@/model/entity/PayGoodsOrder'
import { LogicDelete } from '@/model/LogicDelete'
import { ElMessage, TabsPaneContext } from 'element-plus'
import { reactive, ref } from 'vue'

const DB = cloud.database().collection(CoreStudent.TABLE_NAME)
const db = cloud.database().collection(PayGoodsOrder.TABLE_NAME)

export default class StudentService {
    //搜索框数据 显示 隐藏
    public queryData = reactive({
        visible: true,
        label: '',
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
            size: 10,
            total: 100,
        },
    })

    //详情
    public detail = reactive({
        data: {},
        visible: false,
        collapseActiveName: '1',
        show() {
            this.visible = true
        },
        close() {
            this.visible = false
        },

    })

    public pageSizeChange = (val: any) => {
        this.tableData.page.size = val
        this.getTableList()
    }

    public currentPageChange = (val: any) => {
        this.tableData.page.current = val
        this.getTableList()
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
    public handleClick = (id: string) => {
        this.detail.show()
        this.getDetailApi(id).then(response => {
            console.log(response)
            this.detail.data = response.detailData

        }).catch(err => {
            ElMessage.error(err)
        })
    }

    public getTableList = () => {
        this.tableData.tableIsLoading = true
        this.getTableDataApi(this.tableData.currentTab, this.tableData.page, this.queryData.label).then((response: any) => {
            if (this.tableData.currentTab === '0') {
                this.tableData.list = response.data
            } else {
                this.tableData.payList = response.data
            }
            this.tableData.page.total = response.total
            this.tableData.tableIsLoading = false
        }).catch((err: any) => {
            ElMessage.error(err)
        })
    }

    /**
     * 获得表格数据api
     * @param isPay 免费/付费
     * @param page  分页信息
     * @param params 搜索信息
     * @returns {Promise<{total: number, data: any[]}>}
     * @private
     */
    private async getTableDataApi(isPay: any, page: any, params: any) {
        let whereFlag: {}
        if (!params) {
            whereFlag = {
                isPay: isPay,
            }
        } else {
            whereFlag = {
                isPay: isPay,
                name: new RegExp(`.*${params}.*`),
            }
        }
        const totalRes = await DB
            .where(whereFlag)
            .count()
        if (!totalRes.ok) {
            throw new Error(totalRes.error)
        }
        const listRes = await DB
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
        const detailRes = await DB
            .where({
                _id: id,
            })
            .getOne()
        if (!detailRes.ok) {
            throw new Error(detailRes.error)
        }
        const payRes = await db
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
