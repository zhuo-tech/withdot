// noinspection JSXNamespaceValidation

import { CoreDot } from '@/model/entity/CoreDot'
import { Period } from '@/model/Period'
import { CollUtil, KeyValue, ObjectUtil } from 'typescript-util'
import { defineComponent } from 'vue'
import '../style/TimeBubbleStyle.sass'

// 样式常量
const CONSTANT_STYLE = {
    ROW_HEIGHT: 40,
    TIME_LINE_HEIGHT: 100,
}

type DataType = {
    wrapperRef: HTMLDivElement
}

export default defineComponent({
    props: {
        list: {
            type: Array,
            default: () => [],
        },
        // 容器宽度
        containerWidth: {
            type: Number,
            default: 0,
        },
        // 完整时间区间
        timePeriod: {
            type: [Period, Object],
            required: true,
        },
    },
    emits: ['select'],
    data(): DataType {
        return {
            wrapperRef: null,
        } as any
    },
    computed: {
        /**
         * 打点信息列表 按照 position.z 分组, 按照 z 值排序
         */
        zIndexMap() {
            const map: Record<string, Array<CoreDot>> = CollUtil.groupBy(this.list as Array<CoreDot>, dot => String(dot?.position?.z))
            return ObjectUtil.toArray(map).sort(({key: ak}, {key: bk}) => parseInt(ak) - parseInt(bk))
        },
    },
    methods: {
        /**
         * 渲染一行
         */
        renderRow(kv: KeyValue<string, Array<CoreDot>>, index: number) {
            return (
                <div key={ index } class="row">
                    <div class="prefix">{ kv.key }</div>
                    { kv.value.map((dot, dotIndex) => this.renderItem(dot, dotIndex)) }
                </div>
            )
        },

        /**
         * 渲染一项, 处理气泡定位
         */
        renderItem(dot: CoreDot, index: number) {
            const allTime = this.timePeriod.end - this.timePeriod.start
            const {start = 0, end = 0} = dot
            const itemLeft = start / allTime * this.containerWidth
            const itemWidth = (end - start) / allTime * this.containerWidth

            const left = itemLeft + 'px'
            const width = Math.max(itemWidth, 50) + 'px'

            return (
                <div class="item" key={ dot._id } onClick={ () => this.itemOnClick(dot) } style={ {left, width} }>
                    { dot.label }
                </div>
            )
        },

        itemOnClick(dot: CoreDot) {
            this.$emit('select', dot.start)
        },

    },
    render() {
        const {ROW_HEIGHT, TIME_LINE_HEIGHT} = CONSTANT_STYLE
        const height = this.zIndexMap.length * ROW_HEIGHT + TIME_LINE_HEIGHT + 'px'

        const DefaultSlot = this.$slots.default
        return (
            <div class="timeline-wrapper" style={ {height} }>
                <div class="content">
                    {/* @ts-ignore */ }
                    <DefaultSlot ref={ el => (this.wrapperRef as any) = el }></DefaultSlot>
                    <div class="dot-time-list">
                        { this.zIndexMap.map((kv, index) => this.renderRow(kv, index)) }
                    </div>
                </div>
            </div>
        )
    },
})
