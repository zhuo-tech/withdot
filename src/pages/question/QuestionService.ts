import { cloud } from '@/cloud'
import { CoreQuestionRepo } from '@/model/entity/CoreQuestionRepo'
import { LogicDelete } from '@/model/LogicDelete'
import { QuestionTypeEnum } from '@/model/QuestionTypeEnum'
import { ElMessage } from 'element-plus'
import { FormInstance } from 'element-plus/es'
import { reactive, ref } from 'vue'

export const questionTypeList = [
    {label: '单选题', value: QuestionTypeEnum.RADIO},
    {label: '多选题', value: QuestionTypeEnum.MULTI},
    {label: '判断题', value: QuestionTypeEnum.JUDGE},
    {label: '简答题', value: QuestionTypeEnum.SAQ},
]

export enum questionType {
    radio = '单选题',
    multi = '多选题',
    judge = '判断题',
    saq = '简答题'
}

export default class QuestionService {
    public DB = cloud.database().collection(CoreQuestionRepo.TABLE_NAME)
    public formStatus = ref(false)    //false 编辑  true 添加
    public tableIsLoading = ref(false)
    public formRef: FormInstance
    public data: any = ref({
        page: {
            currentPage: 1,
            pageSize: 10,
            total: 10,
        },
        loading: false,
    })
    public showQuery = ref(false)
    public queryData = reactive({
        label: '',
    })
    public formData = reactive({
        visible: false,
        formIsLoading: false,
        show() {
            this.visible = true
        },
        close() {
            this.visible = false
        },
        initForm() {
            this.form = {
                _id: '',
                label: '',
                content: '',
                type: '',
            }
        },
        form: {
            _id: '',
            label: '',
            content: '',
            type: '',
        },
    })
    public rules = reactive({
        label: [
            {required: true, message: '请输入题目标题', trigger: 'blur'},
            {min: 3, max: 10, message: '字符应该在3到10', trigger: 'blur'},
        ],
        type: [
            {required: true, message: '选择题目类型', trigger: 'blur'},
        ],
        content: [
            {required: true, message: '请输入题目内容', trigger: 'blur'},
        ],
    })

    /**
     * 添加题目按钮
     */
    public addQuestion = () => {
        this.showQuery.value = !this.showQuery.value
        this.formStatus.value = true
    }

    /**
     * 刷新题库列表
     */
    public listUpdate = async () => {
        this.tableIsLoading.value = true
        await this.getList()
        setTimeout(() => {
            this.tableIsLoading.value = false
        }, 1000)
    }

    /**
     * 富文本返回的值
     * @param value
     */
    public changeValue = (value: any) => {
        this.formData.form.content = value
    }
    public pageSizeChange = (val: any) => {
        this.data.value.page.pageSize = val
        this.getList()
    }
    public currentPageChange = (val: any) => {
        this.data.value.page.currentPage = val
        this.getList()
    }
    /**
     * 获取表格列表数据
     */
    public getList = () => {
        this.data.value.loading = true
        let whereFlag: any = {
            delFlag: LogicDelete.NORMAL,
        }
        if (this.queryData.label) {
            whereFlag.label = new RegExp(`.*${this.queryData.label}.*`)
        }
        this.getListCount(whereFlag).then(response => {
            if (!response.ok) {
                ElMessage.error(response.error)
                return
            }
            this.data.value.page.total = response.total
        }).catch(err => {
            ElMessage.error(err)
        })
        this.getListFn(whereFlag).then(response => {
            if (!response.ok) {
                ElMessage.error(response.error)
                return
            }
            this.data.value.list = response.data
            this.data.value.loading = false
        }).catch(err => {
            ElMessage.error(err)
        })
    }
    /**
     * 编辑按钮
     */
    public handleEdit = (row: any) => {
        this.formData.form = {
            _id: row._id,
            label: row.label,
            content: row.content,
            type: row.type,
        }
        this.formStatus.value = false
        this.formData.show()
    }

    /**
     * 删除题目
     * @param data
     */
    public handleDelete=(data:any)=>{
        this.delete(data).then(response=>{
            if(!response.ok){
                ElMessage.error(response.error)
            }
            ElMessage.success('删除成功')
            this.getList()
        }).catch(err=>{
            ElMessage.error(err)
        })
    }
    /**
     * 添加/编辑题目
     */
    public formSubmit = () => {
        this.formRef?.validate(valid => {
            if (!valid) {
                ElMessage.error('请按要求填写表单')
                return
            }
            this.formData.formIsLoading = true
            if (this.formStatus.value) {
                this.formSubmitFn().then(response => {
                    this.repeatResponse(response)
                }).catch(err => {
                    ElMessage.error(err)
                })
                return
            }
            this.editQuestion(this.formData.form).then(response => {
                this.repeatResponse(response)
            }).catch(err => {
                ElMessage.error(err)
            })
        })
    }

    private formSubmitFn = async () => {
        return await this.DB
            .add({
                ...this.formData.form,
                delFlag: LogicDelete.NORMAL,
                createTime: Date.now(),
                updateTime: Date.now(),
            })
    }

    private getListFn = async (whereFlag: any) => {
        return await this.DB
            .where(whereFlag)
            .page({
                current: this.data.value.page.currentPage,
                size: this.data.value.page.pageSize,
            })
            .get()
    }
    private getListCount = async (whereFlag: any) => {
        return await this.DB
            .where(whereFlag)
            .count()
    }

    private editQuestion = async (data: any) => {
        return await this.DB
            .where({
                _id: data._id,
                delFlag: LogicDelete.NORMAL,
            })
            .update({
                label: data.label,
                type: data.type,
                content: data.content,
                updateTime: Date.now(),
            })
    }
    private delete = async (data:any)=>{
        return await this.DB
            .where({
                _id:data._id,
                delFlag:LogicDelete.NORMAL
            })
            .update({
                delFlag:LogicDelete.DELETED
            })
    }
    private repeatResponse = (response: any) => {
        if (!response.ok) {
            ElMessage.error(response.error)
            return
        }
        setTimeout(() => {
            this.formData.formIsLoading = false
            if (!this.formData.form._id) {
                ElMessage.success('题目添加成功')
            } else {
                ElMessage.success('题目编辑修改成功')
            }
            this.formData.close()
            this.formData.initForm()
            this.getList()
        }, 1000)
    }
}
