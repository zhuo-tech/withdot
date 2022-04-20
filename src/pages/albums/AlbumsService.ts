import { cloud } from '@/cloud'
import { CoreAlbum } from '@/model/entity/CoreAlbum'
import { LogicDelete } from '@/model/LogicDelete'
import { ElMessage, FormInstance } from 'element-plus'
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default class AlbumsService {
    public addFormRef: FormInstance
    //控制新建专辑组件显示隐藏
    public formStates = reactive({
        isShow: false,
        show() {
            this.isShow = true
        },
        close() {
            this.isShow = false
        },
    })
    //新建专辑组件数据
    public addFormData = reactive({
        data: {                                //表单数据
            name: '',
        },
        addFormIsLoading: false,
    })
    public query = reactive({            //搜索数据
        title: '',
    })
    public page = reactive({
        currentPage: 1,
        pageSize: 10,
        total: 20,
    })
    public list: any = reactive([])
    //表单验证
    public rules = reactive({
        name: [
            {required: true, message: '请输入专辑名称', trigger: 'blur'},
            {min: 3, max: 10, message: '字符应该在3到10', trigger: 'blur'},
        ],
    })
    private router = useRouter()
    private DB = cloud.database().collection(CoreAlbum.TABLE_NAME)

    /**
     * 添加新专辑按钮
     */
    public clickAddForm() {
        this.formStates.show()
    }

    /**
     * 创建新专辑取消按钮
     */
    public addFormCancel() {
        this.formStates.close()
    }

    /**
     * 创建新专辑确定按钮
     */
    public async addFormDefine() {
        this.addFormRef?.validate((valid) => {
            if (!valid) {
                ElMessage.error('请按要求填写表单')
                return
            }
            this.addFormFn(this.addFormData.data)
            setTimeout(() => {
                ElMessage.success('添加新专辑成功')
                this.formStates.close()
            }, 1000)
            this.addFormData.data.name = ''
            this.getAlbumList()
        })
    }

    public pageSizeChange = async (val: number) => {
        this.page.pageSize = val
        await this.getAlbumList()
    }

    public currentPageChange = async (val: number) => {
        console.log(val)
        this.page.currentPage = val
        await this.getAlbumList()
    }

    /**
     * 获取表格数据
     * @returns {Promise<{current: number, total: number, data: any[], size: number}>}
     */
    public getAlbumList = async () => {

        const action = async () => {
            this.addFormData.addFormIsLoading = true
            let whereFlag: any = {
                delFlag: LogicDelete.NORMAL,
            }
            const countRes = await this.DB
                .where(whereFlag)
                .count()
            if (!countRes.ok) {
                throw new Error(countRes.error)
            }

            const getRes = await this.DB
                .where(whereFlag)
                .page({
                    current: this.page.currentPage,
                    size: this.page.pageSize,
                })
                .orderBy('updateTime', 'desc')
                .orderBy('_id', 'asc')
                .get()
            if (!getRes.ok) {
                throw new Error(countRes.error)
            }

            this.page.total = countRes.total
            this.list = getRes.data
            this.addFormData.addFormIsLoading = false
        }

        await action()
            .catch(err => {
                ElMessage.error(err?.message)
            })
    }

    /**
     * 删除专辑
     * @param row
     * @returns {Promise<void>}
     */
    public async handleDelete(row: any) {
        const res = await this.DB
            .where({
                _id: row._id,
                delFlag: LogicDelete.NORMAL,
            })
            .update({
                delFlag: LogicDelete.DELETED,
            })
        if (!res.ok) {
            ElMessage.error(res.error)
        } else {
            ElMessage.success('删除成功')
            await this.getAlbumList()
        }
    }

    public handleEdit = (row: any) => {
        this.router.push(`/albums/edit?_id=${ row._id }`).then(r => {})
    }

    /**
     * 添加新建专辑方法
     * @param data
     * @returns {Promise<void>}
     * @private
     */
    private async addFormFn(data: any) {
        const addData = {
            title: data.name,
            createTime: Date.now(),
            updateTime: Date.now(),
            delFlag: LogicDelete.NORMAL,
        }
        const res = await this.DB
            .add(addData)
        if (!res.ok) {
            ElMessage.error(res.error)
            return
        }
    }

}
