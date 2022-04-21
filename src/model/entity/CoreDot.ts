import { BaseEntity } from '@/model/BaseEntity'
import { CoreDotPosition } from '@/model/entity/Dot/CoreDotPosition'
import { ExamConfig, GeneralConfig, ImageConfig, TextConfig, UrlConfig } from '@/model/entity/Dot/DotConfig'
import { DotDisplayType } from '@/model/entity/Dot/DotDisplayType'

/**
 * 视频播放打点
 * @author HK
 * @date 2022年04月01日 12点57分
 */
export class CoreDot<T extends CoreDotType = any> implements BaseEntity {

    public static readonly TABLE_NAME = 'core_dot'

    _id: string

    workId: string

    /**
     * 组件 打点对应的组件
     */
    type: T

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

    /**
     * 展示类型
     */
    display: DotDisplayType

    /**
     * 定位
     */
    position: CoreDotPosition

    /**
     * 配置信息
     */
    config: DotTypeConfigMapping[T]

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
 * 类型配置映射
 */
export interface DotTypeConfigMapping {
    [CoreDotType.文本]: TextConfig,
    [CoreDotType.链接]: UrlConfig,
    [CoreDotType.图片]: ImageConfig,
    [CoreDotType.热区]: GeneralConfig,
    [CoreDotType.题目]: ExamConfig,
    [CoreDotType.表单]: GeneralConfig,
    [CoreDotType.书签]: GeneralConfig,
}
