// noinspection JSXNamespaceValidation

import ImgForm from '@/components/workConfigForm/ImgForm.vue'
import TextForm from '@/components/workConfigForm/TextForm.vue'
import UrlForm from '@/components/workConfigForm/UrlForm.vue'
import { CoreDotType } from '@/model/entity/CoreDot'
import { defineComponent } from 'vue'

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
    },
    components: {
        ImgForm,
        TextForm,
        UrlForm,
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

        // @ts-ignore
        return <ConfigForm { ...this.$props }></ConfigForm>
    },
})
