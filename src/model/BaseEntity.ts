export interface BaseEntity {
    /**
     * Mongo ID
     */
    _id: string
    /**
     * 创建时间
     */
    createTime: number
    /**
     * 更新时间
     */
    updateTime: number
    /**
     * 创建人ID, 可选
     */
    createBy: string
    /**
     * 更新人ID, 可选
     */
    updateBy: string
}
