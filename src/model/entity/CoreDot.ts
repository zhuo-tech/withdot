import { BaseEntity } from '@/model/BaseEntity'
import { CoreExam } from './CoreExam'

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
    type: CoreDotType

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

    position: {
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

/**
 * 类型
 */
export enum CoreDotType {
    '文本' = 'TEXT',
    '链接' = 'LINK',
    '图片' = 'IMAGE',
    '热区' = 'HOT_SPOT',
    '题目' = 'TOPIC',
    '表单' = 'FORM',
    '书签' = 'BOOKMARK'
}

/**
 * 展示类型
 */
export enum DotDisplayType {
    BUTTON = 'button',
    EXPANDED = 'expanded'
}

/**
 * 打点配置
 */
type DotConfig = CoreExamDotConfig | CoreTextDotConfig | CoreImageDotConfig  | CoreUrlDotConfig


/**
 * 视频打点考试配置
 */
export interface CoreExamDotConfig {
    exam: Array<CoreExam>
    totalScore: number,
    passScore: number,
    lockFlag: true
}

/**
 * 文本
 * @property text 文本内容
 * @property switch 是否设置展示时长 false
 * @property time 时长/s 默认3s
 * @property pause 是否暂停 默认是（当播放器播放到打点的位置时候，如果开启了则视频播放暂停）
 */
export interface CoreTextDotConfig {
    text: string
    switch: boolean
    pause: boolean
    time: number
}


/**
 * 图片
 * @property url 图片地址
 * @property switch 是否设置展示时长 false
 * @property time 时长/s 默认3s
 * @property pause 是否暂停 默认是（当播放器播放到打点的位置时候，如果开启了则视频播放暂停）
 */
 export interface CoreImageDotConfig {
    url: string
    switch: boolean
    pause: boolean
    time: number
}


/**
 * 链接
 * @property url 链接地址
 * @property switch 是否设置展示时长 false
 * @property time 时长/s 默认3s
 * @property pause 是否暂停 默认是（当播放器播放到打点的位置时候，如果开启了则视频播放暂停）
 */
 export interface CoreUrlDotConfig {
    url: string
    switch: boolean
    pause: boolean
    time: number
}
