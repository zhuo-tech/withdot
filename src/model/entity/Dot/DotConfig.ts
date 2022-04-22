import { CoreExam } from '@/model/entity/CoreExam'

/**
 * Core dot config 通用 控制属性
 *
 * @author LL
 * @date 2022-04-21 上午 9:50
 **/
export interface GeneralConfig {
    /**
     * 是否暂停 默认是（当播放器播放到打点的位置时候，如果开启了则视频播放暂停）
     */
    pause: boolean
    /**
     * 时长/s 默认3s
     */
    time: number
    /**
     * 可选: 是否锁定
     */
    lockFlag?: true
}

/**
 * 考试 / 题目
 */
export interface ExamConfig extends GeneralConfig {
    /**
     * exam题目类型
     */
    exam: Array<CoreExam>
    totalScore?: number,
    passScore?: number,
    lockFlag: true
}

/**
 * 图片
 * @property url 图片地址
 * @property switch 是否设置展示时长 false
 */
export interface ImageConfig extends GeneralConfig {
    url: string
    switch: boolean
}

/**
 * 文本
 * @property text 文本内容
 * @property switch 是否设置展示时长 false
 */
export interface TextConfig extends GeneralConfig {
    text: string
    switch: boolean
}

/**
 * 链接
 * @property url 链接地址
 * @property switch 是否设置展示时长 false
 */
export interface UrlConfig extends GeneralConfig {
    url: string
    switch: boolean
}
