import { CoreDot, CoreDotPosition, CoreDotType, DotDisplayType } from '@/model/entity/CoreDot'
import { RuleItem } from 'async-validator'
import { FormInstance } from 'element-plus'

/**
 * AddPoint
 * @author LL
 * @date 2022-04-11 下午 10:46
 **/
export class AddPointContext {

    public formIsShow = false
    public formRef: FormInstance
    public formData: CoreDot = AddPointContext.formDataDefault()
    public formRule: Partial<Record<keyof CoreDot, Array<RuleItem>>> = {
        start: [{type: 'number', min: 0, trigger: 'blur', message: '', required: true}],
        end: [{type: 'number', min: 0, trigger: 'blur', message: '', required: true}],
        label: [{type: 'string', trigger: 'blur', message: '必填项', required: true}],
        display: [{type: 'string', trigger: 'blur', message: '必填项', required: true}],
        config: [{type: 'object', trigger: 'blur', message: '必填项', required: true}],
        type: [{type: 'string', trigger: 'blur', message: '必填项', required: true}],
        position: [{type: 'object', trigger: 'blur', message: '必填项', required: true}],
        workId: [{type: 'string', trigger: 'blur', message: '必填项', required: true}],
    }

    public formIsLoading: boolean = false
    /**
     * 当前打点类型
     */
    public currentType: CoreDotType = CoreDotType.题目

    public static formDataDefault() {
        let dot = new CoreDot()
        dot.display = DotDisplayType.BUTTON
        dot.config = {} as any
        dot.position = CoreDotPosition.DEFAULT
        return dot
    }

    public onMenuSelect(type: CoreDotType) {
        this.currentType = type
        this.show()
    }

    public show() {
        this.formIsShow = true
    }

    public close() {
        this.formIsShow = false
        this.formData = AddPointContext.formDataDefault()
    }

}
