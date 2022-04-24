/**
 * 打点定位属性
 */
export class CoreDotPosition {
    /**
     * 新增打点时的初始位置
     */
    public static readonly DEFAULT = new CoreDotPosition(0.5, 0.5, 1, 0, 0)

    x: number
    y: number
    z?: number
    width?: number
    height?: number

    constructor(x: number = 0, y: number = 0, z: number = 0, width: number = 0, height: number = 0) {
        this.x = x
        this.y = y
        this.z = z
        this.width = width
        this.height = height
    }

    public static toLocation(position: CoreDotPosition) {
        return {
            width: position.width,
            height: position.height,
            left: position.x,
            top: position.y,
            zIndex: position.z,
        }
    }
}
