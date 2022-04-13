import { CoreDot, CoreDotType } from '@/model/entity/CoreDot'
import { reactive, ref } from 'vue'

/**
 * AddPoint
 * @author LL
 * @date 2022-04-11 下午 10:46
 **/
export class AddPointContext {

    public formIsShow = ref(false)
    public formData = reactive(new CoreDot())
    public formIsLoading: boolean = false
    /**
     * 当前打点类型
     */
    public currentType: CoreDotType = CoreDotType.题目
    public onMenuSelect = (type: CoreDotType) => {
        this.currentType = type
        this.show()
    }

    public show() {
        this.formIsShow.value = true
    }

    public close() {
        this.formIsShow.value = false
    }

}
