/**
 * 宽高比
 */
export class AspectRatio {
    /**
     * 默认 16:9
     */
    public static readonly DEFAULT = new AspectRatio(16, 9)

    public width: number
    public height: number

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
    }
}
