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
        const value = this.$props.value

        let ConfigForm = <span>{ type }</span>

        switch (type) {
            case CoreDotType.链接:
                ConfigForm = <UrlForm value={ value }></UrlForm>
                break
            case CoreDotType.书签:

                break
            case CoreDotType.图片:
                ConfigForm = <ImgForm value={ value }></ImgForm>
                break
            case CoreDotType.文本:
                ConfigForm = <TextForm value={ value }></TextForm>
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
        return <ConfigForm></ConfigForm>
    },
})
