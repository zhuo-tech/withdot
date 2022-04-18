import { BasePage } from "@/model/BasePage"

/**
 * 学生查询对象
 * @author HK
 * @date 2022年04月01日 17点13分
 */
export class StudentQo extends BasePage {
    current: number
    size: number
    isPay?: string
    constructor(current: number, size: number) {
        super()
        this.current = current
        this.size = size
    }
}