import { BaseEntity } from "@/model/BaseEntity";
import { CommonEnum } from "@/model/CommonEnum";
import { FeedbackTypeEnum } from "@/model/FeedbackTypeEnum";

/**
 * 视频播放打点反馈组件
 * @author HK
 * @date 2022年04月01日 12点57分
 */
export class CoreDotFeedback implements BaseEntity {

    public static readonly TABLE_NAME = 'core_dot_feedback'

    /**
     * 默认否
     */
     public judge: CommonEnum.USEFUL | CommonEnum.UNUSEFUL

     /**
      * 分类
      */
     public type: FeedbackTypeEnum.FEEDBACK | FeedbackTypeEnum.VOTE

    /**
     * 是否允许跳过；默认否
     * 是:继续播放
     * 否:必须答题完成后再可以继续播放
     */
     public slotSkip: CommonEnum.NORMAL | CommonEnum.DISABLE

     /**
      * 学生ids
      */
     public studentIds?: Array<number>

     /**
      * 描述
      */
     public profile?: string

    _id: string
    createTime: number
    updateTime: number
    createBy: string
    updateBy: string

}
