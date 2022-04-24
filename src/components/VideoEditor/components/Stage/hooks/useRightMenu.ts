import { Ref, ref } from 'vue'

type RightMenuAction = '+1' | '-1' | 'max' | 'min'
const Z_INDEX_MAX = 100
const Z_INDEX_MIN = 0
const Z_INDEX_DEFAULT = 1

export type RightMenuReturn = {
    isShow: Ref<boolean>
    zIndex: Ref<number>
    show(event: MouseEvent): void
    close(): void
    setZIndex(action: RightMenuAction): void
}

/**
 * 右键菜单功能, 菜单显示时向左上方偏移一定像素
 * @author LL
 * @date 2022-04-24 上午 12:21
 * @param {HTMLDivElement} element 右键菜单容器元素引用
 * @param {number} offset 偏移量, 单位 px; 默认 20
 * @param onChange 发生变化时的回调
 * @param initValue 初始值
 **/
export function useRightMenu(element: Ref<HTMLDivElement>, initValue: { zIndex: number }, onChange?: (zIndex: number) => void, offset: number = 20): RightMenuReturn {
    const isShow: Ref<boolean> = ref(false)
    const zIndex: Ref<number> = ref(initValue.zIndex)

    return {
        isShow,
        zIndex,
        show(event: MouseEvent) {
            if (isShow.value) {
                return
            }
            const {offsetX, offsetY} = event
            element.value.style.top = offsetY - offset + 'px'
            element.value.style.left = offsetX - offset + 'px'
            isShow.value = true
        },
        close() {
            isShow.value = false
        },
        setZIndex(action: RightMenuAction) {
            let value = zIndex.value
            switch (action) {
                case '+1':
                    value = Math.min(value + 1, Z_INDEX_MAX)
                    break
                case '-1':
                    value = Math.max(value - 1, Z_INDEX_MIN)
                    break
                case 'max':
                    value = Z_INDEX_MAX
                    break
                case 'min':
                    value = Z_INDEX_MIN
                    break
                default:
            }
            zIndex.value = value
            onChange?.(value)
        },
    }
}
