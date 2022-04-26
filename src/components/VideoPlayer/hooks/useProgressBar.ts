import { ref, Ref } from 'vue'

export type PropsType = {
    value: number
    bufferValue: number
    min: number
    max: number
    formatTips: (value: number) => string
}

export type EmitsType = {
    (event: 'update:value', value: number): void,
    (event: 'change', value: number): void,
}

export type ProgressBarReturn = {
    buttonAdsorption: Ref<boolean>
    percentage: Readonly<string>
    bufferPercentage: Readonly<string>
    showTipsValue: Readonly<string>
    trackOnClick(event: MouseEvent): void
    buttonMouseUp(): void
    buttonMouseDown(): void
    trackMouseMove(event: MouseEvent): void
}

/**
 * ProgressBar
 * @author LL
 * @date 2022年04月25日 11点40分
 */
export function useProgressBar(trackRef: Ref<HTMLDivElement>, tipsRef: Ref<HTMLDivElement>, props: PropsType, emits: EmitsType): ProgressBarReturn {
    const buttonAdsorption = ref(false)
    let tipsValue = 0

    const emitValue = (value: number) => {
        emits('update:value', value)
        emits('change', value)
    }

    return {
        buttonAdsorption,
        get percentage() {
            const {value, max} = props
            return (value / max * 100).toFixed(2) + '%'
        },
        get bufferPercentage() {
            const {max, bufferValue} = props
            return (bufferValue / max * 100).toFixed(2) + '%'
        },
        get showTipsValue() {
            if (props.formatTips) {
                return props.formatTips(tipsValue)
            }
            return tipsValue.toFixed(2)
        },
        trackOnClick(event: MouseEvent) {
            emitValue(event.offsetX / trackRef.value.getBoundingClientRect().width * props.max)
        },
        buttonMouseUp() {
            buttonAdsorption.value = false
        },
        buttonMouseDown() {
            buttonAdsorption.value = true
        },
        trackMouseMove(event: MouseEvent) {
            const {left, width} = trackRef.value.getBoundingClientRect()
            const {clientX} = event

            const value = (clientX - left) / width * props.max

            if (buttonAdsorption.value) {
                emitValue(value)
                return
            }

            tipsValue = value
            tipsRef.value.style.left = (clientX - left) / width * 100 + 'px'
        },
    }
}
