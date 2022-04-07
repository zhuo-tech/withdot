import { BaseEntity } from '@/model/BaseEntity'

/**
 * 视频播放打点
 * @author HK
 * @date 2022年04月01日 12点57分
 */
export class CoreDot implements BaseEntity {

    public static readonly TABLE_NAME = 'core_dot'

    workId: string

    /**
     * 组件 打点对应的组件
     */
    type: string

    /**
     * 打点的开始时间和结束时间
     * 单位秒（s）
     */
    start: number

    /**
     * 结束时间
     */
    end?: number

    /**
     * 标签
     */
    label?: string

    display: DotDisplayType

    position?: {
        x: number
        y: number
        z?: number
        width?: number
        height?: number
    }

    config: DotConfig

    _id: string
    createTime: number
    updateTime: number
    createBy: string
    updateBy: string

}

export enum DotDisplayType {
    BUTTON = 'button',
    EXPANDED = 'expanded'
}

type DotConfig = CoreExamDotConfig | CoreTextDotConfig

/**
 * 测验(题目)
 */
export interface CoreExamDotConfig {
    list: {
        question: any
        score: number
    }[]

    passLine: number
    lock: boolean
}

/**
 * 文本
 */
export interface CoreTextDotConfig {
    text: string
}
