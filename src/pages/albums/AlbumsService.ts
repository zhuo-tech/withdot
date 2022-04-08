import { cloud } from '@/cloud'
import { CoreAlbum } from '@/model/entity/CoreAlbum'
import { ElMessage, FormInstance } from 'element-plus'
import { reactive, Ref } from 'vue'

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
    //表单验证
    public rules = reactive({
        name: [
            {required: true, message: '请输入专辑名称', trigger: 'blur'},
            {min: 3, max: 10, message: '字符应该在3到10', trigger: 'blur'},
        ],
    })
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
        console.log(this.addFormRef)
        this.addFormRef?.validate((valid) => {
            if (!valid) {
                ElMessage.error('请按要求填写表单')
                return
            }
        })
        // this.formStates.close()
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
            desc: '',
            cover: '',
            coverHref: '',
            sellingPrice: '',
            workList: [],
            createTime: Date.now(),
            createBy: '',
            updateBy: '',
            updateTime: Date.now(),
            delFlag: '0',
        }
        const res = await this.DB
            .add(addData)
        if (!res.ok) {
            ElMessage.error(res.error)
        }
    }

}
