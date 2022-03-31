import { LafUploadResponse } from '@/components/Upload/Upload'
import { FileInfo } from '@/pages/materials/Material'

export interface FileService {
    /**
     * 上传单个小文件
     * @param {File} file 文件
     * @param {string} fileName 文件名, 可选
     * @returns {UploadResponse} 统一的响应格式
     */
    upload(file: File, fileName?: string): Promise<FileInfo>;

    /**
     * URL补全
     * @param {string} url 不完整的URL
     * @returns {string} HTTP 绝对地址, 或者可以临时使用的URL
     */
    showUrl(url: string): string;

    /**
     * url上传, 可选支持
     * @returns {string} 上传用URL
     */
    getActionUploadUrl(): string;

    /**
     * URL 上传 可选 header
     */
    getActionUploadHeaders(): Record<string, string>;

    formatResponse(res: LafUploadResponse, file?: File & { uid?: number }): FileInfo
}
