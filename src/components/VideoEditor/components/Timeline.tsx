// noinspection JSXNamespaceValidation

import { TimeUnit } from 'typescript-util'
import { defineComponent } from 'vue'
import '../style/TimelineStyle.sass'

class Period {
    start: number
    end: number

    constructor(start: number, end: number) {
        this.start = start
        this.end = end
    }
}

const DOMRectEmpty: DOMRect = {
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
} as any

type DataType = {
    containerRef: HTMLDivElement
    hoverLeft: number
    hoverValue: number
}

export default defineComponent({
    props: {
        start: {
            type: Number,
            default: 0,
        },
        end: {
            type: Number,
            default: 0,
        },
        current: {
            type: Number,
            default: -1,
        },
    },
    emits: ['select'],
    computed: {
        integerRange() {
            const {start, end} = this
            return new Period(Math.round(start ?? 0), Math.round(end ?? 0))
        },
        containerRect(): DOMRect {
            return this.containerRef ? this.containerRef.getBoundingClientRect() : DOMRectEmpty
        },
    },
    data(): DataType {
        return {
            containerRef: null,
            hoverLeft: 0,
            hoverValue: 0,
        } as any
    },
    methods: {
        /**
         * @param {number} start 单位 秒
         * @param {number} end 单位 秒
         * @param {TimeUnit} timeUnit 时间单位
         * @return {Array<Period>} 给定 timeUnit 作为粒度, 能够划分的所有时间段. 可能存在 Period 不足一个完整的单位
         */
        getPeriod(start: number, end: number, timeUnit: TimeUnit): Array<Period> {
            const toSecond = timeUnit.toSecond(1)
            const res = []
            while (true) {
                let tryAdd = start + toSecond
                if (tryAdd < end) {
                    res.push(new Period(start, tryAdd))
                    start = tryAdd
                } else {
                    res.push(new Period(start, end))
                    break
                }
            }
            return res
        },

        /**
         * 渲染一个小时 (下的所有分钟刻度)
         * @param {Period} period 以小时为单位划分的时间段
         */
        renderHour(period: Period) {
            const periodArr = this.getPeriod(period.start, period.end, TimeUnit.MINUTE)
            return (
                <div class="timeline-item hour" style={ {flexGrow: periodArr.length} }>
                    { periodArr.map((period, index) => this.renderMinute(period, index == 0)) }
                </div>
            )
        },

        /**
         * 渲染一分钟(下的所有秒刻度)
         * @param {Period} period 以分钟为单位 划分的时间段
         * @param {boolean} showStart 是否显示 start tips; end tips 自动 在 小于 一半时隐藏, 大于一半时显示;
         */
        renderMinute(period: Period, showStart: boolean) {
            const periodArr = this.getPeriod(period.start, period.end, TimeUnit.SECOND)
            return (
                <div class="timeline-item minute" style={ {flexGrow: periodArr.length} }>
                    {
                        showStart && (
                            <div class="start-tips">
                                { TimeUnit.SECOND.display(period.start) }
                            </div>
                        )
                    }
                    {
                        periodArr.length > 30 && (
                            <div class="end-tips">
                                { TimeUnit.SECOND.display(period.end) }
                            </div>
                        )
                    }
                    {
                        periodArr.map(second => {
                            const isCurrent = Math.round(this.current) === second.start
                            const className = isCurrent ? 'timeline-item second current-item' : 'timeline-item second'
                            return (<div class={ className } data-time-value={ second.start }></div>)
                        })
                    }
                </div>
            )
        },

        /**
         * 在鼠标悬停时, 移动悬浮刻度指针
         */
        onMouseover(event: MouseEvent) {
            const ele: HTMLDivElement = event.target as any
            if (!ele.className.includes('second')) {
                return
            }
            this.hoverValue = parseInt(ele.dataset['timeValue'] ?? '')
            this.hoverLeft = ele.getBoundingClientRect().right - this.containerRect.left
        },

        /**
         * 在鼠标单击时, 声明被选择时间
         */
        onMouseclick(event: MouseEvent) {
            const ele: HTMLDivElement = event.target as any
            if (!ele.className.includes('second')) {
                return
            }
            this.$emit('select', ele.dataset['timeValue'])
        },
    },
    render() {
        const {start, end} = this.integerRange
        const hourPeriod = this.getPeriod(start, end, TimeUnit.HOUR)

        return (
            <div ref={ el => (this.containerRef as any) = el }
                 class="timeline-container"
                 onMouseover={ event => this.onMouseover(event) }
                 onClick={ event => this.onMouseclick(event) }>
                <div class="current-pointer"></div>
                <div class="hover-pointer" style={ {left: this.hoverLeft + 'px'} }>
                    <div class="scale-value">{ TimeUnit.SECOND.display(this.hoverValue) }</div>
                </div>
                { hourPeriod.map(period => this.renderHour(period)) }
            </div>
        )
    },
})
