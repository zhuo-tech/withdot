/**
 * 鼠标事件的坐标
 * @author LL
 * @date 2022年04月08日 15点45分
 */
export class MouseEventTool {

    public static print(event: MouseEvent) {
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

        // 相对于真个屏幕的坐标
        res.push(`screen(${ screenX }, ${ screenY })`)

        return res.join('\t')
    }

}
