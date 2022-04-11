import { getToken } from '@/api/token'
import { LAF_BLASE_URL } from '@/cloud'
import { LafUploadResponse } from '@/components/Upload/Upload'
import { getLogger } from '@/main'
import { FileInfo } from '@/model/FileInfo'
import type { FileService } from '@/service/FileService'
import { StorageUnit, StrUtil } from 'typescript-util'

/* 文件常量 */
export const FILE = {
    /* 默认文件桶 */
    DEFAULT_BUCKET: 'public',
    /* 图片上传支持的文件类型 */
    FILE_TYPE: ['image/webp', 'image/jpeg', 'image/png', 'image/gif'],
    /* 上传文件时允许的最大文件大小, 单位字节(byte) */
    MAX_FILE_SIZE: StorageUnit.MB.toByte(5),
    /* 图片压缩后的体积, 低于此值不压缩, 单位 KB {@link https://www.npmjs.com/package/image-conversion} */
    PICTURE_COMPRESSION_TARGET: StorageUnit.MB.toKByte(3),
}

// noinspection JSUnusedLocalSymbols
export class FileServiceImpl implements FileService {
    private readonly log = getLogger('FileService')
    private readonly BASE_URL = LAF_BLASE_URL + '/file'

    /**
     * 默认, 基础 文件桶名
     * @type {string}
     * @private
     */
    private static readonly BUCKET_NAME = () => FILE.DEFAULT_BUCKET

    public getActionUploadHeaders(): Record<string, string> {
        return {
            Authorization: getToken(),
        }
    }

    public getActionUploadUrl(): string {
        return this.BASE_URL + `/${ FileServiceImpl.BUCKET_NAME() }?auto=1`
    }

    public showUrl(url: string): string {
        if (StrUtil.isEmpty(url)) {
            return StrUtil.EMPTY
        }
        if (url.startsWith(StrUtil.HTTP) || url.startsWith(StrUtil.HTTPS)) {
            return url
        }
        let source: string
        if (url.startsWith(StrUtil.PATH_INTEGRAL)) {
            source = this.BASE_URL + url
        } else {
            source = this.BASE_URL + StrUtil.PATH_INTEGRAL + url
        }
        return source
    }

    public async upload(file: File, fileName?: string): Promise<FileInfo> {
        const formData = new FormData()
        formData.set('file', file)

        const {ok, statusText, json} = await fetch(this.getActionUploadUrl(), {
            headers: this.getActionUploadHeaders(),
            body: formData,
        })
        // 网络错误
        if (!ok) {
            throw new Error('错误' + statusText)
        }
        const res: LafUploadResponse = await json()

        return this.formatResponse(res, file)
    }

    public formatResponse(res: LafUploadResponse, file?: File & { uid?: number }) {
        const {code, data} = res
        if (code !== 0) {
            throw new Error('上传失败')
        }
        const {_id, length: size, metadata: {parent, contentType: type}, filename} = data

        const id = file?.uid ?? _id
        const href = '/' + FileServiceImpl.BUCKET_NAME() + filename
        const name = file?.name ?? filename
        let newVar: FileInfo = {type, size, id, href, name}
        return newVar
    }
}
