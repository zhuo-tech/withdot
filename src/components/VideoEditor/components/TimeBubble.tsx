// noinspection JSXNamespaceValidation

import { CoreDot } from '@/model/entity/CoreDot'
import { CollUtil, ObjectUtil } from 'typescript-util'
import { defineComponent } from 'vue'
import '../style/TimeBubbleStyle.sass'

// 样式常量
const CONSTANT_STYLE = {
    ROW_HEIGHT: 40,
    TIME_LINE_HEIGHT: 100,
}

export default defineComponent({
    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        zIndexMap() {
            const map: Record<string, Array<CoreDot>> = CollUtil.groupBy(this.list as Array<CoreDot>, dot => String(dot?.position?.z))
            return ObjectUtil.toArray(map).sort(({key: ak}, {key: bk}) => parseInt(ak) - parseInt(bk))
        },
    },
    render() {
        const {ROW_HEIGHT, TIME_LINE_HEIGHT} = CONSTANT_STYLE
        const height = this.zIndexMap.length * ROW_HEIGHT + TIME_LINE_HEIGHT + 'px'

        const DefaultSlot = this.$slots.default
        return (
            <div class="timeline-wrapper" style={ {height} }>
                {/* @ts-ignore */ }
                <DefaultSlot></DefaultSlot>
                <div class="dot-time-list">
                    {
                        this.zIndexMap.map((kv, index) => (
                            <div key={ index } class="row">
                                <div class="prefix">{ kv.key }</div>
                                {
                                    kv.value.map((dot, dotIndex) => (
                                        <div class="item" key={ dotIndex }>
                                            { dot.label }
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    },
})
