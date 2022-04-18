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
        getPeriod(start: number, end: number, timeUnit: TimeUnit) {
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

        renderHour(period: Period) {
            const periodArr = this.getPeriod(period.start, period.end, TimeUnit.MINUTE)
            return (
                <div class="timeline-item hour" style={{flexGrow: periodArr.length}}>
                    { periodArr.map((period, index) => this.renderMinute(period, index == 0)) }
                </div>
            )
        },

        renderMinute(period: Period, showStart: boolean) {
            const periodArr = this.getPeriod(period.start, period.end, TimeUnit.SECOND)
            return (
                <div class="timeline-item minute" style={{flexGrow: periodArr.length}}>
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
                            return (<div class={className} data-time-value={ second.start }></div>)
                        })
                    }
                </div>
            )
        },

        onMouseover(event: MouseEvent) {
            const ele: HTMLDivElement = event.target as any
            if (!ele.className.includes('second')) {
                return
            }
            this.hoverValue = parseInt(ele.dataset['timeValue'] ?? '')
            this.hoverLeft = ele.getBoundingClientRect().left - this.containerRect.left

        },

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