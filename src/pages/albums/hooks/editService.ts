import { cloud } from '@/cloud'
import { CoreAlbum } from '@/model/entity/CoreAlbum'
import { HisVodRecord } from '@/model/entity/HisVodRecord'
import { LogicDelete } from '@/model/LogicDelete'
import { ElMessage, FormInstance } from 'element-plus'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

const DB = cloud.database()

export default class EditService {
    public formRef: FormInstance
    public Editform = reactive({
        visible: false,
        formIsLoading: false,
        show() {
            this.visible = true
        },
        close() {
            this.visible = false
        },
        form: {
            title: '',
            desc: '',
            cover: '',
            sellingPrice: '',
            coverHref: '',
        },
    })

    public rules = reactive({
        title: [
            {required: true, message: '请输入专辑名称', trigger: 'blur'},
            {min: 3, max: 10, message: '字符应该在3到10', trigger: 'blur'},
        ],
        desc: [
            {required: true, message: '请输入专辑描述', trigger: 'blur'},
            {min: 10, max: 100, message: '字符应该在10到100', trigger: 'blur'},
        ],
        cover: [
            {required: true, message: '请选择专辑封面', trigger: 'blur'},
        ],
    })
    public subassembly = reactive({         //编辑子组件抽屉参数
        visible: false,
        show() {
            this.visible = true
        },
        close() {
            this.visible = false
        },
    })
    public albumsDetail = reactive({
        workList: [],
    })
    public workPage = reactive({
        current: 1,
        pageSize: 5,
        total: 100,
    })
    private route = useRoute()

    public getUrl_Id = (): string => {
        const query = this.route.query
        return query._id as string
    }

    /**
     * 是否收费开关
     * @param row
     */
    public changeSwitch = (row: any) => {
        this.changSwitchApi(row).then(() => {
            setTimeout(() => {
                ElMessage.success('修改成功')
            }, 1000)
        }).catch(err => {
            ElMessage.error(err)
        })
    }

    public async getAlbumsList() {
        const res = await DB.collection(CoreAlbum.TABLE_NAME)
            .where({
                _id: this.getUrl_Id(),
                delFlag: LogicDelete.NORMAL,
            })
            .getOne()
        if (!res.ok) {
            ElMessage.error(res.error)
            return
        }
        const viewersRes = await DB.collection(HisVodRecord.TABLE_NAME)
            .where({albumId: this.getUrl_Id()})
            .get()
        if(!viewersRes.ok) {
            throw new Error(viewersRes.error)
        }
        let newArr: any = []
        newArr = viewersRes.data.filter((item, index, origin) =>
                index === origin.findIndex((itemInner) => {
                    return itemInner.userId === item.userId
                }),
        )
        this.albumsDetail = res.data
        this.albumsDetail['viewers'] = newArr?.length ?? 0
        this.Editform.form.title = res.data.title
        this.Editform.form.cover = res.data.cover
        this.Editform.form.coverHref = res.data.coverHref
        this.Editform.form.desc = res.data.desc
        this.Editform.form.sellingPrice = res.data.sellingPrice
    }

    public async formSubmit() {
        this.formRef?.validate((valid) => {
            if (!valid) {
                ElMessage.error('请按要求填写表单')
                return
            }
            this.Editform.formIsLoading = true
            this.editUpdata().then(() => {
                    setTimeout(() => {
                        this.Editform.formIsLoading = false
                        ElMessage.success('修改成功')
                        this.getAlbumsList()
                        this.Editform.close()
                    }, 1000)
                },
            ).catch(err => {
                ElMessage.error(err)
            })
        })
    }

    /**
     * 删除作品
     * @param row
     * @returns {Promise<void>}
     */
    public async deleteWork(row: any) {
        let list = this.albumsDetail.workList
        let newList = list.filter(item => (item as any)._id !== row._id)
        const res = await DB.collection(CoreAlbum.TABLE_NAME)
            .where({
                _id: this.getUrl_Id(),
                delFlag: LogicDelete.NORMAL,
            })
            .update({
                workList: newList,
            })
        if (!res.ok) {
            ElMessage.error(res.error)
            return
        }
        setTimeout(() => {
            ElMessage.success('删除成功')
            this.getAlbumsList()
        }, 1000)
    }

    /**
     * 编辑专辑
     */
    private async editUpdata() {
        const res = await DB.collection(CoreAlbum.TABLE_NAME)
            .where({
                _id: this.getUrl_Id(),
                delFlag: LogicDelete.NORMAL,
            })
            .update(this.Editform.form)
        if (!res.ok) {
            throw new Error(res.error)
        }
        return res
    }

    private changSwitchApi = async (row: any) => {
        let list = this.albumsDetail.workList
        list.forEach((item: any) => {
            if (item._id === row._id) {
                item.isPay = row.isPay
                item.trialTime = row.trialTime
            }
        })
        const res = await DB.collection(CoreAlbum.TABLE_NAME)
            .where({
                _id: this.getUrl_Id(),
                delFlag: LogicDelete.NORMAL,
            })
            .update({
                workList: list,
            })
        if (!res.ok) {
            throw new Error(res.error)
        }
    }
}
