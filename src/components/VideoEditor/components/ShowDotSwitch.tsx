// noinspection JSXNamespaceValidation

import ShowImage from '@/components/ShowDot/ShowImage.vue'
import ShowLink from '@/components/ShowDot/ShowLink.vue'
import ShowText from '@/components/ShowDot/ShowText.vue'
import { CoreDot, CoreDotType } from '@/model/entity/CoreDot'
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        data: {
            type: [CoreDot, Object],
            required: true,
        },
    },
    components: {
        ShowImage,
    },
    render() {
        const {type, label, config} = this.$props.data

        let Show = <span>{ type } -- { label }</span>

        switch (type as CoreDotType) {
            case CoreDotType.图片:
                Show = <ShowImage />
                break
            case CoreDotType.文本:
                Show = <ShowText></ShowText>
                break
            case CoreDotType.链接:
                Show = <ShowLink></ShowLink>
                break
            default:
        }

        // @ts-ignore
        return <Show data={ config }></Show>
    },
})
