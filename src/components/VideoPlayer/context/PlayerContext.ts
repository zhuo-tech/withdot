import { onMounted, onUnmounted, reactive } from 'vue'
import { DivWrapper } from '../service/DivWrapper'

/**
 * 播放器上下文
 * @author LL
 * @date 2022-04-04 下午 11:25
 **/
export class PlayerContext {
    /**
     * 最外层的容器 DOM 引用, 全屏时的目标对象
     * @type {HTMLDivElement}
     */
    public playerBoxElement: DivWrapper = new DivWrapper()
    public boxWidthHeight = reactive({
        height: 0,
        width: 0,
    })

    private readonly props: Readonly<any>
    private resize = () => {
        const {width, height} = this.props.aspectRatio
        this.playerBoxElement.resizeHeight(width, height)

        const {width: w, height: h} = this.playerBoxElement.realWidthHeight
        this.boxWidthHeight.height = h
        this.boxWidthHeight.width = w
    }

    constructor(props: any) {
        this.props = props
        onMounted(this.resize)
        this.playerBoxElement.onInitializeFinish(() => window.addEventListener('resize', this.resize, {passive: true}))
        onUnmounted(() => window.removeEventListener('resize', this.resize))

        this.playerBoxElement.onInitializeFinish(() => {
            const ro = new ResizeObserver((entries, observer) => {
                // TODO: 应对 window 监听 的不足
                console.debug('观测: ....', entries)
            })
            ro.observe(this.playerBoxElement.element)
        })
    }
}
