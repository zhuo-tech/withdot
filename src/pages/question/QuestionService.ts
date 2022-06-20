import { cloud } from '@/cloud'
import { CoreQuestionRepo } from '@/model/entity/CoreQuestionRepo'
import { LogicDelete } from '@/model/LogicDelete'
import { QuestionTypeEnum } from '@/model/QuestionTypeEnum'
import { ElMessage } from 'element-plus'
import { FormInstance } from 'element-plus/es'
import { reactive, ref } from 'vue'

export const questionTypeList = [
    {label: '选择', value: QuestionTypeEnum.XUANZE},
    {label: '填空', value: QuestionTypeEnum.TIANKONG},
    {label: '简答题', value: QuestionTypeEnum.SAQ},
]

export enum QuestionType {
    select = '选择题',
    fillInTheBlank = '填空题',
    saq = '简答题'
}

export const questionButtonList = [
    {questionName: '选择', type: QuestionTypeEnum.XUANZE},
    {questionName: '简答', type: QuestionTypeEnum.SAQ},
    {questionName: '填空', type: QuestionTypeEnum.TIANKONG},
]

type FormDataType = {
    _id: string,
    label: string,
    content: string | Array<any>,
    type: string,
}

export default class QuestionService {
    public DB = cloud.database().collection(CoreQuestionRepo.TABLE_NAME)
    public formStatus = ref(false)   //false 编辑  true 添加
    public tableIsLoading = ref(false)
    public formRef: FormInstance
    public data: any = ref({
        list: [],
        page: {
            currentPage: 1,
            pageSize: 10,
            total: 10,
        },
        loading: false,
    })
    public showQuery = ref(true)
    public queryData = reactive({
        label: '',
    })
    public topicButton = reactive({
        showAddTopic: false,
        show() {
            this.showAddTopic = true
        },
        close() {
            this.showAddTopic = false
        },
    })
    public formData = reactive({
        formIsLoading: false,
        selectVisible: false,
        tkVisible: false,
        saqVisible: false,
        tkShow() {
            this.tkVisible = true
        },
        tkClose() {
            this.tkVisible = false
        },
        saqShow() {
            this.saqVisible = true
        },
        saqClose() {
            this.saqVisible = false
        },
        selectShow() {
            this.selectVisible = true
        },
        selectClose() {
            this.selectVisible = false
        },
        allClose() {
            this.selectClose()
            this.tkClose()
            this.saqClose()
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
        } as FormDataType,
    })

    /**
     * 选择题数据
     */
    public selectList = reactive({
        content: [
            {answer: '', value: false},
        ] as Array<any>,
        addOptions() {
            let item = {answer: '', value: false}
            this.content.push(item)
        },
        deleteOptions(id: number) {
            this.content.splice(id, 1)
        },
        initContent(){
            this.content=[
                {answer: '', value: false},
            ]
        }
    })

    public tkList = reactive({
        content: [
            {answer: ''},
        ] as Array<any>,
        addOptions() {
            let item = {answer: ''}
            this.content.push(item)
        },
        deleteOptions(id: number) {
            this.content.splice(id, 1)
        },
        initContent() {
            this.content = [
                {answer: ''},
            ]
        },
    })
    public rules = reactive({
        label: [
            {required: true, message: '请输入题目标题', trigger: 'blur'},
        ],
        type: [
            {required: true, message: '选择题目类型', trigger: 'blur'},
        ],
        content: [
            {required: true, message: '请输入答案', trigger: 'blur'},
        ],
    })

    /**
     *搜索按钮
     */
    public searchQuestion = () => {
        this.topicButton.close()
        this.showQuery.value = !this.showQuery.value
    }

    /**
     * 点击新建题目
     * @param {string} type 题目类型
     */
    public addQuestion = (type: string) => {
        this.formData.form.type = type
        switch (type) {
            case QuestionTypeEnum.XUANZE:
                this.formData.selectShow()
                break
            case QuestionTypeEnum.TIANKONG:
                this.formData.tkShow()
                break
            case QuestionTypeEnum.SAQ:
                this.formData.saqShow()
        }
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
        switch (row.type) {
            case QuestionTypeEnum.XUANZE:
                this.selectList.content = this.formData.form.content as Array<any>
                this.formData.selectShow()
                break
            case QuestionTypeEnum.TIANKONG:
                this.tkList.content = this.formData.form.content as Array<any>
                this.formData.tkShow()
                break
            case QuestionTypeEnum.SAQ:
                // this.selectList.content = this.formData.form.content as Array<any>
                this.formData.saqShow()
                break
        }
        this.formStatus.value = false
    }

    /**
     * 删除题目
     * @param data
     */
    public handleDelete = (data: any) => {
        this.delete(data).then(response => {
            if (!response.ok) {
                ElMessage.error(response.error)
            }
            ElMessage.success('删除成功')
            this.getList()
        }).catch(err => {
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
            } else {
                this.editQuestion(this.formData.form).then(response => {
                    this.repeatResponse(response)
                }).catch(err => {
                    ElMessage.error(err)
                })
            }
        })
    }

    private formSubmitFn = async () => {
        switch (this.formData.form.type) {
            case QuestionTypeEnum.XUANZE:
                this.formData.form.content = this.selectList.content
                break
            case QuestionTypeEnum.TIANKONG:
                this.formData.form.content = this.tkList.content
                break
        }
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
            .orderBy('updateTime', 'desc')
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
    private delete = async (data: any) => {
        return await this.DB
            .where({
                _id: data._id,
                delFlag: LogicDelete.NORMAL,
            })
            .update({
                delFlag: LogicDelete.DELETED,
            })
    }
    private repeatResponse = (response: any) => {
        if (!response.ok) {
            ElMessage.error(response.error)
            return
        }
        setTimeout(() => {
            this.formData.formIsLoading = false
            if (this.formStatus.value) {
                ElMessage.success('题目添加成功')
            } else {
                ElMessage.success('题目编辑修改成功')
            }
            this.formData.allClose()
            this.formData.initForm()
            this.getList()
        }, 1000)
    }
}
