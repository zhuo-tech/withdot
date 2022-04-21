// noinspection JSXNamespaceValidation

import { Period } from '@/model/Period'
import { TimeUnit } from 'typescript-util'
import { defineComponent } from 'vue'
import '../style/TimelineStyle.sass'

const DOMRectEmpty: DOMRect = {
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
} as any

type DataType = {
    /**
     * 容器 Ref 引用
     */
    containerRef: HTMLDivElement
    /**
     * 容器DOM宽度
     */
    containerWidth: number
    /**
     * 悬浮指针 left 定位值
     */
    hoverLeft: number
    /**
     * 悬浮位置刻度值
     */
    hoverValue: number
    /**
     * 是否显示悬浮指针
     */
    hoverShow: boolean
    /**
     * 内部属性, 悬停隐藏定时器
     */
    hoverTimer: any
    /**
     * 拖动状态?
     */
    drag: boolean
    /**
     * resize 监视器
     */
    ro: ResizeObserver
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
    emits: ['select', 'drag'],
    expose: ['containerWidth'],
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
            containerRef: {} as any,
            containerWidth: 0,
            hoverLeft: 0,
            hoverValue: 0,
            hoverShow: false,
            hoverTimer: null,
            drag: false,
            ro: new ResizeObserver(() => this.refreshContainerWidth()),
        }
    },
    mounted() {
        // 初始化, 并监听容器大小变化
        this.refreshContainerWidth()
        this.ro.observe(this.containerRef)
    },
    unmounted() {
        // 避免 vite 刷新时错误
        if (this.containerRef) {
            this.ro.unobserve(this.containerRef)
        }
    },
    methods: {

        /**
         * 刷新容器高度
         */
        refreshContainerWidth() {
            // vite 刷新时错误
            if (!this.containerRef) {
                return
            }
            this.containerWidth = this.containerRef.getBoundingClientRect().width
        },

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
            // 拖动期间 悬停禁用
            if (this.drag) {
                return
            }
            const ele: HTMLDivElement = event.target as any
            if (!ele.className.includes('second')) {
                return
            }
            this.hoverValue = this.getTimeValue(ele)
            this.hoverLeft = ele.getBoundingClientRect().right - this.containerRect.left
            this.hoverShow = true
            if (this.hoverTimer) {
                window.clearTimeout(this.hoverTimer)
            }
            this.hoverTimer = TimeUnit.SECOND.setTimeout(() => this.hoverShow = false, 2)
        },

        /**
         * 在鼠标单击时, 声明被选择时间
         */
        onMouseclick(event: MouseEvent) {
            const ele: HTMLDivElement = event.target as any
            if (!ele.className.includes('second')) {
                return
            }
            this.$emit('select', this.getTimeValue(ele))
        },

        /**
         * 在时间轴上移动
         */
        onMousemove(event: MouseEvent) {
            if (!this.drag) {
                return
            }
            const ele: HTMLDivElement = event.target as any
            if (!ele.className.includes('second')) {
                return
            }

            this.$emit('drag', this.getTimeValue(ele))
        },

        /**
         * 工具方法: 从 秒 div 盒子上 取出 time value 值
         * 注意 ele 是否是 秒 元素
         * @private
         */
        getTimeValue(ele: HTMLDivElement) {
            return parseInt(ele.dataset['timeValue'] ?? '')
        },
    },
    render() {
        const {start, end} = this.integerRange
        const hourPeriod = this.getPeriod(start, end, TimeUnit.HOUR)

        return (
            <div ref={ el => (this.containerRef as any) = el }
                 class="timeline-container"
                 onMousemove={ event => this.onMousemove(event) }
                 onMouseover={ event => this.onMouseover(event) }
                 onMousedown={ () => this.drag = true }
                 onMouseup={ () => this.drag = false }
                 onClick={ event => this.onMouseclick(event) }>
                {
                    this.hoverShow && (
                        <div class="hover-pointer" style={ {left: this.hoverLeft + 'px'} }>
                            <div class="scale-value">{ TimeUnit.SECOND.display(this.hoverValue) }</div>
                        </div>
                    )
                }
                { hourPeriod.map(period => this.renderHour(period)) }
            </div>
        )
    },
})
