// noinspection JSXNamespaceValidation

import ShowImage from '@/components/ShowDot/ShowImage.vue'
import ShowLink from '@/components/ShowDot/ShowLink.vue'
import ShowQuestions from '@/components/ShowDot/ShowQuestions.vue'
import ShowText from '@/components/ShowDot/ShowText.vue'
import { CoreDot, CoreDotType } from '@/model/entity/CoreDot'
import { DotDisplayType } from '@/model/entity/Dot/DotDisplayType'
import { defineComponent } from 'vue'
import '../style/ShowDotStyle.sass'

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
    data() {
        return {
            currentType: this.data.display,
        }
    },
    methods: {
        unfold() {
            this.currentType = DotDisplayType.EXPANDED
        },
        doubleClick(event: MouseEvent) {
            event.preventDefault()
            event.stopPropagation()
            this.currentType = DotDisplayType.BUTTON
        },
    },
    render() {
        if (this.currentType === DotDisplayType.HIDE) {
            return <span class="display-hide"></span>
        }

        if (this.currentType === DotDisplayType.BUTTON) {
            return (
                <div class="display-button" onClick={ () => this.unfold() }>{ this.$props.data.label }</div>
            )
        }

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
            case CoreDotType.题目:
                Show = <ShowQuestions></ShowQuestions>
                break
            default:
        }

        // @ts-ignore
        return <Show data={ config } ondblclick={ (event) => this.doubleClick(event) } class="display-expanded"></Show>
    },
})
