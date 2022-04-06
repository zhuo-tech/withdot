import { BaseEntity } from "@/model/BaseEntity";

/**
 * 视频播放打点
 * @author HK
 * @date 2022年04月01日 12点57分
 */
export class CoreDot implements BaseEntity {

    public static readonly TABLE_NAME = 'core_dot'

    /**
     * 打点名称
     */
    name: string

    /**
     * 打点描述
     */
    rmk: string

    /**
     * 组件 打点对应的组件
     */
    component: string

    /**
     * 时长
     * 单位秒（s）
     */
    duration: number

    /**
     * 打点的开始时间和结束时间
     * 单位秒（s）
     */
    range:[startTime:number, endTime?: number]

    _id: string
    createTime: number
    updateTime: number
    createBy: string
    updateBy: string

}