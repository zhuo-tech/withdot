export default class Page<E = any> {
    current: number
    size: number
    total: number
    list: Array<E>

    constructor(current?: number, size?: number, total?: number, list?: Array<E>) {
        this.current = current ?? 1
        this.size = size ?? 20
        this.total = total ?? 0
        this.list = list ?? []
    }
}
