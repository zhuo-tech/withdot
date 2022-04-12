import { reactive, Ref, ref } from 'vue'

export default class QuestionService {
    public showQuery = ref(false)
    public queryData = reactive({})
    public formData = reactive({
        visible: false,
        formIsLoading: false,
        show() {
            this.visible = true
        },
        close() {
            this.visible = false
        },
        form: {},
    })

    /**
     * 添加题目按钮
     */
    public addQuestion = () => {

    }

    /**
     * 刷新题库列表
     */
    public listUpdate() {

    }
}
