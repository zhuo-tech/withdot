import { LogicDelete, SupportLogicDelete } from '@/model/LogicDelete'

export class WxTemplate implements SupportLogicDelete {
    public static readonly TABLE_NAME = 'wx_template'
    /**
     * 模板id
     */
    public _id: string

    /**
     * 模板编号
     */
    public tempKey: string

    /**
     * 模板ID
     */
    public tempId: string

    /**
     * 模板名
     */
    public name: string

    /**
     * 回复内容
     */
    public content: string

    /**
     * 状态
     */
    public status: number

    /**
     * 类型：template:模板消息 subscribe:订阅消息
     */
    public type: string

    /**
     * 创建时间
     */
    public createTime: number

    /**
     * 更新时间
     */
    public updateTime: number

    public delFlag: LogicDelete

}
