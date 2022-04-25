import { AspectRatio } from '@/components/VideoPlayer/service/AspectRatio'
import { getLogger } from '@/main'
import { useResizeMonitor } from '@/tool/hooks/useResizeMonitor'
import { Ref } from 'vue'

const log = getLogger('usePlayerBox')

/**
 * 播放器容器盒子, 维护绝对宽高
 * @author LL
 * @date 2022年04月25日 10点34分
 */
export function usePlayerBox(element: Ref<HTMLDivElement>, ratio: AspectRatio) {

    const resize = () => {
        const {width, height} = ratio
        const {width: w} = element.value.getBoundingClientRect()
        element.value.style.height = w / width * height + 'px'
    }

    useResizeMonitor(resize, () => element.value)

    return {
        toggleFullScreen() {
            useFullScreen(element)
        },
    }
}

function useFullScreen(element: Ref<HTMLDivElement>) {
    const action = async () => {
        log.trace('切换全屏状态')
        if (document.fullscreenElement) {
            await document.exitFullscreen()
        } else {
            await element.value.requestFullscreen({navigationUI: 'auto'})
        }
    }
    action()
        .catch((err) => log.warn('切换到全屏失败', err))
}
