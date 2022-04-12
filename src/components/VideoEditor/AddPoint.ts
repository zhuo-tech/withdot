import { CoreDot } from '@/model/entity/CoreDot'
import { reactive } from 'vue'

/**
 * AddPoint
 * @author LL
 * @date 2022-04-11 下午 10:46
 **/
export class AddPoint {

    public formIsShow = false
    public formData = reactive(new CoreDot())

    public show() {
        this.formIsShow = true
    }

    public close() {
        this.formIsShow = false
    }

    /**
     * 新增打点 提交
     */
    public formSubmit() {

    }

}
