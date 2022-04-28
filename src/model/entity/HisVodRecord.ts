/**
 * 学员观看作品历史记录表
 * @author LL
 * @date 2022年04月01日 12点57分
 */
export class HisVodRecord {

    public static readonly TABLE_NAME = 'his_vod_record'

    _id: string;

    /**
     * 当前登陆人
     */
    userId: string

    /**
     * 专辑ID
     */
    albumId: string

    /**
     * 作品ID
     */
    workerId: string

    /**
     * 观看时间
     */
    createTime: number

}