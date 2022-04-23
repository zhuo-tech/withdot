/**
 * 鼠标事件的坐标
 * @author LL
 * @date 2022年04月08日 15点45分
 */
export class MouseEventTool {

    public static print(event: MouseEvent) {
        // noinspection JSUnusedLocalSymbols
        const {
            x, screenX, movementX, offsetX, pageX, clientX,
            y, screenY, movementY, offsetY, pageY, clientY,
        } = event

        const res: Array<string> = []

        // 在点击的元素中的坐标, 楼下的别名
        res.push(`xy(${ x }, ${ y })`)
        // res.push(`client(${ clientX }, ${ clientY })`)

        // 相对最后的 move 事件的坐标
        res.push(`movement(${ movementX }, ${ movementY })`)

        // 相对于目标节点内边位置的坐标
        res.push(`offset(${ offsetX }, ${ offsetY })`)

        // 相对于整个文档的坐标
        res.push(`page(${ pageX }, ${ pageY })`)

        // 相对于整个屏幕的坐标
        res.push(`screen(${ screenX }, ${ screenY })`)

        return res.join('\t')
    }

    public static keyType(event: MouseEvent): MouseButtonKeyType | null {
        switch (event.button) {
            case MouseButtonKeyType.LEFT:
                return MouseButtonKeyType.LEFT
            case MouseButtonKeyType.CENTER:
                return MouseButtonKeyType.CENTER
            case MouseButtonKeyType.RIGHT:
                return MouseButtonKeyType.RIGHT
            case MouseButtonKeyType.BACK:
                return MouseButtonKeyType.BACK
            case MouseButtonKeyType.GOING:
                return MouseButtonKeyType.GOING
            default:
                return null
        }
    }

    public static isKey(event: MouseEvent, type: MouseButtonKeyType) {
        return this.keyType(event) === type
    }

}

/**
 * @see MouseEvent.button
 * @see <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/button">MouseEvent.button - Web API 接口参考 _ MDN</a>
 */
export enum MouseButtonKeyType {
    LEFT = 0,
    CENTER = 1,
    RIGHT = 2,
    BACK = 3,
    GOING = 4
}
