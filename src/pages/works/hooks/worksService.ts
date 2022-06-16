import { dataList, del } from '@/api/works'
import { ElMessage } from 'element-plus/es'
import { reactive, ref } from 'vue'

export class WorksService {
    //搜索框数据 显示 隐藏
    public queryData = reactive({
        visible: false,
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
    public data = ref()
    public loading = ref(false)
    public page = reactive({               //分页器参数
        current: 1,
        size: 10,
        total: 1000,
    })
    public subassembly = reactive({         //子组件抽屉参数
        visible: false,
        title: '',
    })
    /*
     分页器一页几条
     */
    public pageSizeChange = (val: any) => {
        this.page.size = val
        this.getListData()
    }

    /*
     分页器 当前页
     */
    public currentPageChange = (val: any) => {
        this.page.current = val
        this.getListData()
    }

    /*
     创建作品
     */
    public createWorks = () => {
        this.subassembly.visible = true
        this.subassembly.title = '创建作品'
    }

    /*
     删除
     */
    public handleDelete = (row: any) => {
        del(row._id).then(response => {
            ElMessage.success('删除成功')
            this.getListData()
        }).catch(err => {
            ElMessage.error(err)
        })
    }

    public getListData = () => {
        this.loading.value = true
        dataList(this.page, this.queryData.label).then(response => {
            this.data.value = response?.data
            this.page.total = response?.total as number
            this.loading.value = false
        }).catch(err => {
            ElMessage.error(err)
        })
    }
}
