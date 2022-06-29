import { uploadApi } from '@/api/upload'
import { LafUploadResponse } from '@/components/Upload/Upload'
import { getLogger } from '@/main'
import { FileInfo } from '@/model/FileInfo'
import { FileService, INJECT_KEY_FILE_SERVICE } from '@/service/FileService'
import { UploadFile, UploadFiles, UploadRequestOptions, UploadUserFile } from 'element-plus'
import { CollUtil, ObjectUtil, StrUtil } from 'typescript-util'
import { inject, ref, watchEffect } from 'vue'

// noinspection JSUnusedLocalSymbols
/**
 * UploadFile
 * @author 冰凝
 * @date 2022-06-29 下午 03:01
 **/
export class UploadFileService {
    private readonly log = getLogger('UploadFile')
    public readonly fileService: FileService = inject(INJECT_KEY_FILE_SERVICE) as FileService
    public readonly fileList = ref<Array<UploadUserFile>>([])
    private readonly props: PropType
    private readonly emits: EmitType

    constructor(props: PropType, emits: EmitType) {
        this.props = props
        this.emits = emits
        watchEffect(this.handleEcho)
    }

    public onUploadSuccess = (response: LafUploadResponse, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
        this.updateModel(uploadFiles, this.props)
    }

    public onRemove = (uploadFile: UploadFile) => {
        this.log.trace('移除文件', uploadFile.response, '文件列表', this.fileList.value)
        this.updateModel(this.fileList.value as any, this.props)
    }

    /**
     * 自定义上传
     * @impl 此函数不能返回 {@link Promise} 否则 element-plus upload 会置 response 为 {@link undefined}
     */
    public upLoadRequest = (options: UploadRequestOptions) => {
        const action = async () => {
            const file = options.file
            const videoSrc = URL.createObjectURL(file)
            const time = await UploadFileService.getFileDuration(file, videoSrc)
            console.log('playing => 视频时长: ', time, '秒')

            const onUploadProgress = (event: ProgressEvent) => {
                options.onProgress({...event, percent: event.loaded / event.total * 100} as any)
            }

            const href = await uploadApi(file, onUploadProgress)

            const {name, size, type} = file
            options.onSuccess({id: file['uid'] || Date.now(), href, name, size, type, time} as FileInfo)
        }

        action().catch(err => options.onError(err))
    }

    /**
     * 内部状态变化后, 抛出变化后的数据
     */
    private updateModel(fileList: UploadFiles, propValue: PropType) {
        const {emits} = this
        if (CollUtil.isEmpty(fileList)) {
            emits('update:href', StrUtil.EMPTY)
            emits('update:hrefs', [])
            emits('update:fileInfo', undefined as any)
            emits('update:fileInfoList', [])
            emits('input', [])
            return
        }
        const fileInfo = fileList.filter(i => i.status === 'success')
            .map(i => (i.response) as FileInfo)

        console.log('上传完成后的 文件列表', fileInfo)

        const value = fileInfo.map(i => i.href)
        this.log.trace('v-model 更新', value, fileInfo)

        emits('update:href', value[0] ?? StrUtil.EMPTY)
        emits('update:hrefs', value)
        emits('update:fileInfo', fileInfo[0])
        emits('update:fileInfoList', fileInfo)
        emits('input', fileList)
    }

    /**
     * 处理回显
     */
    private handleEcho = () => {
        const {fileList} = this
        if (CollUtil.isNotEmpty(fileList.value)) {
            return
        }
        const {href, hrefs, fileInfo, fileInfoList} = this.props

        if (CollUtil.isNotEmpty(fileInfoList)) {
            fileList.value = fileInfoList?.map(i => this.fileInfoToUploadFile(i)) as any
            return
        }
        if (ObjectUtil.isNotEmpty(fileInfo)) {
            fileList.value = [this.fileInfoToUploadFile(fileInfo!)]
            return
        }
        if (CollUtil.isNotEmpty(hrefs)) {
            fileList.value = hrefs?.map(i => this.strToUploadFile(i)) as any
        }
        if (StrUtil.isNotEmpty(href)) {
            fileList.value = [this.strToUploadFile(href)]
        }
    }

    /**
     * 格式化工具: {@link FileInfo} -> {@link UploadUserFile}
     */
    private fileInfoToUploadFile = (fileInfo: FileInfo): UploadUserFile => {
        const {id, href, size, type, name} = fileInfo
        return {
            size,
            name,
            uid: id,
            url: this.fileService.showUrl(href),
            response: fileInfo,
            status: 'success',
        } as UploadUserFile
    }

    /**
     * 格式化工具: src -> {@link UploadUserFile}
     */
    private strToUploadFile = (s: any): UploadUserFile => ({
        response: {href: s},
        status: 'success',
        name: s,
        size: 0,
        url: this.fileService.showUrl(s),
        uid: s,
    } as UploadUserFile)

    private static getFileDuration = (file: File, fileSrc: string): Promise<number> => {
        const type = file.type
        let tagName = ''
        if (type.startsWith('video')) {
            tagName = 'video'
        }
        if (type.startsWith('audio')) {
            tagName = 'audio'
        }
        if (!tagName) {
            return new Promise(ok => ok(0))
        }

        const element: HTMLMediaElement = document.createElement(tagName) as any

        element.src = fileSrc
        element.autoplay = true
        element.controls = true
        element.muted = true
        element['width'] = 300

        element.style.position = 'fixed'
        element.style.width = '300px'
        element.style.zIndex = '3000'
        element.style.top = '0'
        element.style.left = '0'
        element.style.visibility = 'hidden'

        return new Promise((ok, err) => {
            element.onloadedmetadata = (ev) => {
                ok(Math.floor(element.duration))
                // 获取媒体元素时长后, 移除 DOM 元素
                element.remove()
            }
        })
    }
}

export type PropType = Readonly<{
    tips?: string | undefined,
    href?: string | undefined,
    hrefs?: String[] | undefined,
    fileInfo?: FileInfo | undefined,
    fileInfoList?: FileInfo[] | undefined
}>

export type EmitType = {
    (event: 'update:href', value: string): void,
    (event: 'update:hrefs', value: Array<string>): void,
    (event: 'update:fileInfo', value: FileInfo): void,
    (event: 'update:fileInfoList', value: Array<FileInfo>): void,
    (event: 'input', value: Array<UploadUserFile>): void
}
