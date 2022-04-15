// noinspection JSXNamespaceValidation

import ImgForm from '@/components/workConfigForm/ImgForm.vue'
import TextForm from '@/components/workConfigForm/TextForm.vue'
import UrlForm from '@/components/workConfigForm/UrlForm.vue'
import { CoreDotType } from '@/model/entity/CoreDot'
import { ObjectUtil } from 'typescript-util'
import { defineComponent } from 'vue'

const formDataDefault: Partial<Record<CoreDotType, any>> = {
    [CoreDotType.文本]: {
        switch: false,
        time: 3,
        pause: true,
    },
    [CoreDotType.书签]: {},
    [CoreDotType.图片]: {
        switch: false,
        time: 3,
        pause: true,
    },
    [CoreDotType.表单]: {},
    [CoreDotType.链接]: {
        switch: false,
        time: 3,
        pause: true,
    },
    [CoreDotType.题目]: {},
}

export default defineComponent({
    name: 'DotConfigForm',
    props: {
        // @ts-ignore
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
            required: true,
        },
    },
    emits: {
        input: (configData: any) => {

        },
        update: (configData: any) => {

        },
    },
    components: {
        ImgForm,
        TextForm,
        UrlForm,
    },
    data() {
        const getValueByType = (propsValue: any, type: CoreDotType) => {
            if (ObjectUtil.isNotEmpty(propsValue)) {
                return propsValue
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
                this.$emit('input', nv)
                this.$emit('update', nv)
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
