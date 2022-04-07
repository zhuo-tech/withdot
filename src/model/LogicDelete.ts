/**
 * @author LL
 * @date 2022年04月07日 11点55分
 */
export enum LogicDelete {
    /**
     * 正常
     */
    NORMAL = 0,

    /**
     * 已删除
     */
    DELETED = 1
}

export interface SupportLogicDelete {
    /**
     * 逻辑删除
     */
    delFlag: LogicDelete
}
