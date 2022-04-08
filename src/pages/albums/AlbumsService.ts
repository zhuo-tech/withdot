import { reactive, ref } from 'vue'

export default class AlbumsService {

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
    public addFormDefine() {
        this.formStates.close()
    }
}
