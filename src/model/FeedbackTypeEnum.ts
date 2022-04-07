/**
 * 反馈类型
 * @author HK
 * @date 2022年04月01日 17点13分
 */
export enum FeedbackTypeEnum {
    /**
     * 反馈
     */
     FEEDBACK = "feedback",

    /**
     * 投票
     */
     VOTE = "vote"
}

export const FeedbackTypeRegExp = {
    FEEDBACK: new RegExp(FeedbackTypeEnum.FEEDBACK),
    VOTE: new RegExp(FeedbackTypeEnum.VOTE)
}
