import { Ref, ref } from 'vue'

/**
 * 右键菜单功能, 菜单显示时向左上方偏移一定像素
 * @author LL
 * @date 2022-04-24 上午 12:21
 * @param {HTMLDivElement} element 右键菜单容器元素引用
 * @param {number} offset 偏移量, 单位 px; 默认 20
 **/
export function useRightMenu(element: Ref<HTMLDivElement>, offset: number = 20) {
    let isShow: Ref<boolean> = ref(false)

    return {
        isShow,
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
    }
}
