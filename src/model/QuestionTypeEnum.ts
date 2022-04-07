/**
 * 题目类型
 * @author HK
 * @date 2022年04月01日 17点13分
 */
export enum QuestionTypeEnum {
    /**
     * 单选题
     */
    RADIO = "radio",
    /**
     * 多选题
     */
    MULTI = "multi",
    /**
     * 判断题
     */
    JUDGE = "judge",
    /**
     * 简单题
     */
    SAQ = "saq"
}

export const QuestionTypeRegExp = {
    RADIO: new RegExp(QuestionTypeEnum.RADIO),
    MULTI: new RegExp(QuestionTypeEnum.MULTI),
    JUDGE: new RegExp(QuestionTypeEnum.JUDGE),
    SAQ: new RegExp(QuestionTypeEnum.SAQ),
}
