// noinspection JSMethodCanBeStatic

import { cloud } from '@/cloud'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'

const DB = cloud.database().collection('core_student')

export default class StudentService {
    //搜索框数据 显示 隐藏
    public queryData = reactive({
        visible: false,
        label:'',
        show() {
            this.visible = true
        },
        close() {
            this.visible = false
        },
        init(){
            this.label=''
        }
    })

    //表格数据
    public tableData = reactive({
        tableIsLoading: false,
        list: [],
        page: {
            current: 1,
            size: 10,
            total: 100,
        },
    })
    //tabs
    public activeName = ref('0')

    //详情
    public detail = reactive({
        data:{},
        visible:false,
        collapseActiveName:'1',
        show(){
            this.visible = true
        },
        close(){
            this.visible = false
        }

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
    public tabClick = () => {
        this.getTableList()
    }

    /**
     * 查看详情
     */
    public handleClick = (id:string) => {
       this.detail.show()
       this.getDetailApi(id).then(response=>{
           console.log(response)
           this.detail.data=response.data
       }).catch(err=>{
           ElMessage.error(err)
       })
    }

    public getTableList = () => {
        this.tableData.tableIsLoading = true
        this.getTableDataApi(this.activeName.value, this.tableData.page, this.queryData.label).then((response: any) => {
            this.tableData.list = response.data
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
                name: new RegExp(`.*${params}.*`)
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

    private async getDetailApi(id:string){
        const detailRes = await DB
            .where({
                _id:id
            })
            .getOne()
        if(!detailRes.ok){
            throw new Error(detailRes.error)
        }
        return {
            data:detailRes.data
        }
    }
}
