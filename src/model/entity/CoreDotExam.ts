import { BaseEntity } from "@/model/BaseEntity";
import { CommonEnum } from "@/model/CommonEnum";

/**
 * 视频播放打点测试组件
 * @author HK
 * @date 2022年04月01日 12点57分
 */
export class CoreDotExam implements BaseEntity {
    
    public static readonly TABLE_NAME = 'core_dot_exam'

    /**
     * 视频打点ID
     */
    public dotId: string

    /**
     * 专辑
     */
    public albumId: string

    /**
     * 作品
     */
    public workId: string

    /**
     * 测试名称
     */
    public name: string 

    /**
     * 是否允许跳过；默认否
     * 是:继续播放
     * 否:必须答题完成后再可以继续播放
     */
    public slotSkip: CommonEnum.NORMAL | CommonEnum.DISABLE

    /**
     * 温馨提示
     * @type {Array<string>}
     */
    public tips: Array<string>

     /**
     * 题目列表信息
     */
    public answers: Array<QuestionAnswer>

    _id: string
    createTime: number
    updateTime: number
    createBy: string
    updateBy: string
  
}

/**
 * 题目回答记录
 * @author HK
 * @date 2022年04月01日 12点57分
 */
export class QuestionAnswer {

    /**
     * 主键
     */
     public _id: string

     /**
      * 答题用户
      */
     public userId?: string

     /**
      * 题目
      */
     public questionId: string

     /**
      * 题目分数
      */
     public originalScore: number

     /**
      * 用户实际得分
      */
     public userScore?: number

     /**
      * 是否答对默认否
      */
     public isRight: CommonEnum.NORMAL | CommonEnum.DISABLE

    /**
     * 是否是答案默认为否
     */
     public isAnswer: CommonEnum.NORMAL | CommonEnum.DISABLE
}