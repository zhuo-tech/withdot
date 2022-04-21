import { CoreDot, CoreDotType } from '@/model/entity/CoreDot'
import { CoreDotPosition } from '@/model/entity/Dot/CoreDotPosition'
import { DotDisplayType } from '@/model/entity/Dot/DotDisplayType'
import { RuleItem } from 'async-validator'
import { FormInstance } from 'element-plus'
import { CollUtil, ObjectUtil } from 'typescript-util'
import { ExtractPropTypes } from 'vue'

export type EmitsType = {
    (event: 'submit', data: CoreDot): void
}

export type PropsType = Readonly<ExtractPropTypes<{
    currentPlayTime: {
        type: NumberConstructor
        default: number
    }
}>>

/**
 * AddPoint
 * @author LL
 * @date 2022-04-11 下午 10:46
 **/
export class AddPointContext {

    private readonly props: PropsType
    private readonly emits: EmitsType

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

    constructor(props: PropsType, emits: EmitsType) {
        this.props = props
        this.emits = emits
    }

    public submit() {
        this.formRef.validate()
            .then((validate) => {
                if (!validate) {
                    return
                }
                // TODO: 临时措施, 从 config 数据中获取可能存在的结束时间偏移量; 默认值 0 未定义
                const end = this.formData.config['time'] ?? 0

                this.formData.type = this.currentType
                this.formData.start = this.props.currentPlayTime
                this.formData.end = this.props.currentPlayTime + end

                this.emits('submit', this.formData)
                this.close()
            })
            .catch(err => {
                CollUtil.flatMap(ObjectUtil.toArray(err), i => i.value)
                    .forEach(i => console.warn('验证失败', i))
            })
    }

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
