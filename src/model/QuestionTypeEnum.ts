/**
 * 题目类型
 * @author HK
 * @date 2022年04月01日 17点13分
 */
export enum QuestionTypeEnum {
    /**
     * 单选题
     */
    RADIO = "RADIO",
    /**
     * 多选题
     */
    MULTI = "MULTI",
    /**
     * 判断题
     */
    JUDGE = "JUDGE",
    /**
     * 简单题
     */
    SAQ = "SAQ"
}

export const QuestionTypeRegExp = {
    RADIO: new RegExp(QuestionTypeEnum.RADIO),
    MULTI: new RegExp(QuestionTypeEnum.MULTI),
    JUDGE: new RegExp(QuestionTypeEnum.JUDGE),
    SAQ: new RegExp(QuestionTypeEnum.SAQ),
}
