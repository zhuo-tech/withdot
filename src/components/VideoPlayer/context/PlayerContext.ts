import { onMounted, onUnmounted } from 'vue'
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
    private readonly props: Readonly<any>

    constructor(props: any) {
        this.props = props

        onMounted(this.resize)
        this.playerBoxElement.onInitializeFinish(() => window.addEventListener('resize', this.resize, {passive: true}))
        onUnmounted(() => window.removeEventListener('resize', this.resize))
    }

    private resize = () => {
        const {width, height} = this.props.aspectRatio
        this.playerBoxElement.resizeHeight(width, height)
    }
}
