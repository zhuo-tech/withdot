// noinspection JSXNamespaceValidation

import ImgForm from '@/components/workConfigForm/ImgForm.vue'
import QuestionForm from '@/components/workConfigForm/QuestionsForm.vue'
import TextForm from '@/components/workConfigForm/TextForm.vue'
import UrlForm from '@/components/workConfigForm/UrlForm.vue'
import { CoreDot, CoreDotType } from '@/model/entity/CoreDot'
import { ObjectUtil } from 'typescript-util'
import { defineComponent } from 'vue'

const formDataDefault: Partial<Record<CoreDotType, any>> = {
    [CoreDotType.文本]: {
        switch: false,
        time: 3,
        pause: true,
        text: '',
    },
    [CoreDotType.图片]: {
        switch: false,
        time: 3,
        pause: true,
    },
    [CoreDotType.链接]: {
        switch: false,
        time: 3,
        pause: true,
    },
    [CoreDotType.表单]: {},
    [CoreDotType.书签]: {},
    [CoreDotType.题目]: {
        switch: false,
        time: 3,
        pause: true,
    },
    [CoreDotType.热区]: {},
    [CoreDotType.链接]: {},
}

type ConfigType = CoreDot['config']

// noinspection JSUnusedLocalSymbols
export default defineComponent({
    name: 'DotConfigForm',
    props: {
        type: {
            type: String,
            required: true,
        },
        labelWidth: {
            type: String,
            default: '100px',
        },
        labelSuffix: {
            type: String,
            default: ':',
        },
        value: {
            type: Object,
            required: false,
        },
    },
    emits: {
        'update:value': (configData: ConfigType) => ObjectUtil.isNotEmpty(configData),
    },
    components: {
        ImgForm,
        TextForm,
        UrlForm,
        QuestionForm,
    },
    data() {
        const getValueByType = (propsValue: any, type: CoreDotType) => {
            if (ObjectUtil.isNotEmpty(propsValue)) {
                return propsValue
            }
            if (!type) {
                return {}
            }
            return ObjectUtil.copy(formDataDefault[type])
        }
        return {
            getValueByType,
            formData: getValueByType(this.value, this.type as CoreDotType),
        }
    },
    watch: {
        value() {
            this.formData = this.getValueByType(this.value, this.type as CoreDotType)
        },
        formData: {
            deep: true,
            handler: function (nv) {
                if (ObjectUtil.isNotEmpty(nv)) {
                    this.$emit('update:value', nv)
                }
            },
        },
    },
    render() {
        const type: CoreDotType = this.$props.type as any

        let ConfigForm = <span>暂不支持的类型: { type }</span>

        switch (type) {
            case CoreDotType.链接:
                ConfigForm = <UrlForm></UrlForm>
                break
            case CoreDotType.书签:

                break
            case CoreDotType.图片:
                ConfigForm = <ImgForm></ImgForm>
                break
            case CoreDotType.文本:
                ConfigForm = <TextForm></TextForm>
                break
            case CoreDotType.热区:

                break
            case CoreDotType.表单:

                break
            case CoreDotType.题目:
                ConfigForm = <QuestionForm></QuestionForm>
                break
            default:
        }

        const propValue = {
            ...this.$props,
            value: this.formData,
        }
        // @ts-ignore
        delete propValue.type
        // @ts-ignore
        return <ConfigForm ref="configFormRef" { ...propValue }></ConfigForm>
    },
})
