import { BaseEntity } from '@/model/BaseEntity'
import { DotDisplayType } from './CoreDot'

/**
 * 测验
 * @author HK
 * @date 2022年04月01日 12点57分
 */
export class CoreExam implements BaseEntity {

    _id: string

    /**
     * 
        {
            "dotId": 1,
            "exam": {
                "examId": "1",
                "label": "单元测试",
                "score": 60,
                "qu":[{
                    "quId": "1"
                    “score”: 100,
                    "options":[],
                    "answer":[]
                }]
            }
        }
     */
    public details: Details

    label: string
    score: number
    createTime: number
    updateTime: number
    createBy: string
    updateBy: string

    public static readonly TABLE_NAME = 'core_exam'
}


type Details = RadioQuestion | MultiQuestion


export interface RadioQuestion {
  
}

export interface MultiQuestion {

}
