/**
 * 短信发送记录信息表
 */
export class SysSmsHistory {

    public static readonly TABLE_NAME = 'sys_sms_history'

    /**
     * 主键
     */
    _id: string

    /**
     * 手机号码
     */
    phone: string

    /**
     * 短信验证码
     */
    code: number

    /**
     * 类型
     */
    type: string

    /**
     * 状态
     */
    status: number

    /**
     * 创基时间
     */
    created_at: number

}
