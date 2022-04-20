import { BaseEntity } from '@/model/BaseEntity'

export class CoreStudent implements BaseEntity {
    public static readonly TABLE_NAME = 'core_student'
    public _id: string
    public createBy: string
    public createTime: number
    public updateBy: string
    public updateTime: number

    name: string
    phone: number
    userId: number
    avatar: string
    lastLoginTime: number
    /**
     * 0 付费学员 1 未付费学员
     */
    isPay: string

    /**
     * 学习记录
     *  专辑  作品                进度   完成时间
     *  语文  认识26个字母        100%    2020-01-01
     *  语文  常用的词语          10%     -
     *  数学  学会加减乘除        100%    2020-01-01
     *  语文  口算能力提升        10%     -
     */
    schedules?: Array<Schedule>
}

export  class Schedule {

    /**
     * 专辑ID
     */
    albumId: string

    /**
     * 专辑ID
     */
    albumName: string

    /**
     * 作品ID
     */
    workId: string

    /**
     * 作品名称
     */
     workName: string

    /**
     * 专辑学习状态 0完成1未完成
     */
    status: 0 | 1

    /**
     * 作品学习状态
     */
    workStatus: 0 | 1

    /**
     * 作品学习进度 %
     */
    ratio: number

    /**
     * 完成时间
     */
    lastTime?: number
}

