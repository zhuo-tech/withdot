import { ControlModel } from '@/components/VideoPlayer/service/ControlModel'
import { TimeUnit } from 'typescript-util'
import { Ref, ref } from 'vue'

export type ControlLayerReturn = {
    isShow: Ref<boolean>
    show(): void
    close(): void
}

export type ControlLayerProps = {
    show: boolean
    model: ControlModel
}

const CONTROL_LAYER_HIDE_DELAY = 2

/**
 * ControlLayer
 * @author LL
 * @date 2022年04月25日 11点00分
 */
export function useControlLayer(props: ControlLayerProps): ControlLayerReturn {
    const isShow: Ref<boolean> = ref(false)
    let timeoutTimer: number | undefined = undefined

    const clear = () => {
        if (timeoutTimer) {
            clearTimeout(timeoutTimer)
        }
    }

    const close = () => {
        if (isShow.value) {
            isShow.value = false
        }
    }

    return {
        isShow,
        show() {
            if (!isShow.value) {
                isShow.value = true
            }
            clear()
            timeoutTimer = TimeUnit.SECOND.setTimeout(close, CONTROL_LAYER_HIDE_DELAY)
        },
        close,
    }
}
