/**
 * 文件类型
 * @author LL
 * @date 2022年04月01日 17点13分
 */
export enum FileType {
    /**
     * 图片
     */
    IMAGE = 'image/*',
    /**
     * 视频
     */
    VIDEO = 'video/*',
    /**
     * 音频
     */
    AUDIO = 'audio/*'
}

export const FileTypeRegExp = {
    IMAGE: new RegExp(FileType.IMAGE),
    AUDIO: new RegExp(FileType.AUDIO),
    VIDEO: new RegExp(FileType.VIDEO),
}
