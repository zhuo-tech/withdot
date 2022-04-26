// noinspection JSXNamespaceValidation

import { ResizableLocation, ResizableType, useResizable } from '@/components/VideoEditor/hooks/useResizable'
import { CoreDot } from '@/model/entity/CoreDot'
import { Period } from '@/model/Period'
import { CollUtil, KeyValue, ObjectUtil } from 'typescript-util'
import { defineComponent, ref, Ref } from 'vue'
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
    emits: ['select', 'updateTime'],
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
            const rowRef: Ref<HTMLDivElement> = ref({} as any)

            return (
                <div ref={ el => rowRef.value = (el as any) } key={ index } class="row">
                    <div class="prefix">{ kv.key }</div>
                    { kv.value.map((dot, dotIndex) => this.renderItem(dot, dotIndex, rowRef)) }
                </div>
            )
        },

        /**
         * 渲染一项, 处理气泡定位
         */
        renderItem(dot: CoreDot, index: number, boxRef: Ref<HTMLDivElement>) {
            const allTime = this.timePeriod.end - this.timePeriod.start
            const {start = 0, end = 0} = dot
            const itemLeft = start / allTime * this.containerWidth
            const itemWidth = (end - start) / allTime * this.containerWidth

            const left = itemLeft + 'px'
            const width = Math.max(itemWidth, 50) + 'px'

            // 增加拖动 缩放功能
            const itemRef: Ref<HTMLDivElement> = ref({} as any)
            const initValue: Partial<ResizableLocation> = {
                width: (end - start) / allTime,
                left: (start - this.timePeriod.start) / allTime,
            }
            const boxRect = () => boxRef.value?.getBoundingClientRect() as DOMRect
            const onChange = () => {
                const {width, left} = resizable.location
                const {start: s, end: e} = this.timePeriod
                const start = allTime * left + s
                const end = Math.min(allTime * width + start, e)

                // 主动修改, 避免更新后需要刷新数据
                dot.start = start
                dot.end = end

                this.$emit('updateTime', {_id: dot._id, start, end} as Partial<CoreDot>)
            }
            const resizable = useResizable(itemRef, boxRect, initValue, onChange)

            const stretch = (event: MouseEvent) => {
                event.preventDefault()
                event.stopPropagation()
                resizable.startResizable(event, ResizableType.CENTER_RIGHT)
            }

            return (
                <div ref={ el => itemRef.value = (el as any) }
                     class="item"
                     key={ dot._id }
                     onClick={ () => this.$emit('select', dot.start) }
                     style={ {left, width} }
                     onMousedown={ resizable.startDraggable }>
                    <div class="label">
                        <span>{ dot.label }</span>
                    </div>
                    <div class="stretch" onMousedown={ stretch }></div>
                </div>
            )
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
