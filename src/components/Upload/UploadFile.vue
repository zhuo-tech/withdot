<!--suppress JSUnusedLocalSymbols -->
<script lang="tsx" setup>
import { uploadApi } from '@/api/upload'
import ShowFile from '@/components/Upload/ShowFile'
import { LafUploadResponse } from '@/components/Upload/Upload'
import { useFilePreview } from '@/components/Upload/useFilePreview'
import { getLogger } from '@/main'
import { FileInfo } from '@/model/FileInfo'
import { FileService, INJECT_KEY_FILE_SERVICE } from '@/service/FileService'
// noinspection ES6UnusedImports
import { UploadFilled } from '@element-plus/icons-vue'
import { UploadFile, UploadFiles, UploadProps, UploadRequestOptions, UploadUserFile } from 'element-plus'
import { CollUtil, ObjectUtil, StrUtil, TimeUnit } from 'typescript-util'
import { inject, reactive, watchEffect } from 'vue'

/**
 * 对 el-upload 的包装,
 * 绝大部分 props 透传给 el-upload;
 * 参考: {@link UploadProps}
 * 提供四种 v-model:
 * - v-model:href 单URL, string
 * - v-model:hrefs string[]
 * - v-model:fileInfo 单个完整文件信息, {@link FileInfo}
 * - v-model:fileInfos 多个
 *
 * <h3>
 *     不要传递 action, headres, on-success, fileList 等 上传控制属性,
 *     仅可以传递上传样式控制属性, 如: drag, limit, listType 等 参考: {@link UploadProps}
 *</h3>
 * @inject {@link FileService}
 * */
const props = defineProps<{
    tips?: string
    href?: string
    hrefs?: Array<String>
    fileInfo?: FileInfo
    fileInfoList?: Array<FileInfo>
}>()

const emits = defineEmits<{
    (event: 'update:href', value: string): void
    (event: 'update:hrefs', value: Array<string>): void
    (event: 'update:fileInfo', value: FileInfo): void
    (event: 'update:fileInfoList', value: Array<FileInfo>): void
    (event: 'input', value: Array<UploadUserFile>): void
}>()

const log = getLogger('UploadFile')
const fileService: FileService = inject(INJECT_KEY_FILE_SERVICE) as FileService

let fileList = reactive<Array<UploadUserFile>>([])
const {href, hrefs, fileInfo, fileInfoList} = props
// 处理回显
watchEffect(() => {
    const fileInfoToUploadFile = (fileInfo: FileInfo) => {
        const {id, href, size, type, name} = fileInfo
        return {
            size,
            name,
            uid: id,
            url: fileService.showUrl(href),
            response: fileInfo,
            status: 'success',
        } as UploadUserFile
    }

    const strToUploadFile = (s: any) => ({
        response: {href: s},
        status: 'success',
        name: s,
        size: 0,
        url: fileService.showUrl(s),
        uid: s,
    } as UploadUserFile)

    if (CollUtil.isNotEmpty(fileList)) {
        return
    }
    if (CollUtil.isNotEmpty(fileInfoList)) {
        // @ts-ignore
        fileList = fileInfoList?.map(i => fileInfoToUploadFile(i))
        return
    }
    if (ObjectUtil.isNotEmpty(fileInfo)) {
        // @ts-ignore
        fileList = [fileInfoToUploadFile(fileInfo)]
        return
    }
    if (CollUtil.isNotEmpty(hrefs)) {
        // @ts-ignore
        fileList = hrefs?.map(i => strToUploadFile(i))
    }
    if (StrUtil.isNotEmpty(href)) {
        // @ts-ignore
        fileList = [strToUploadFile(href)]
    }
})

const onUploadSuccess = (response: LafUploadResponse, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    updateModel(uploadFiles, props)
}
const onRemove = (uploadFile: UploadFile) => {
    log.trace('移除文件', uploadFile.response, '文件列表', fileList)
    updateModel(fileList as any, props)
}

function updateModel(fileList: UploadFiles, propValue: typeof props) {
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
    log.trace('v-model 更新', value, fileInfo)

    emits('update:href', value[0] ?? StrUtil.EMPTY)
    emits('update:hrefs', value)
    emits('update:fileInfo', fileInfo[0])
    emits('update:fileInfoList', fileInfo)
    emits('input', fileList)
}

const getFileDuration = (file: File, fileSrc: string): Promise<number> => {
    const type = file.type
    let tagName = ''
    if (type.startsWith('video')) {
      tagName = 'video'
    }
    if(type.startsWith('audio')){
        tagName = 'audio'
    }
    if (!tagName) {
        return new Promise(ok => ok(0))
    }

    const vE: HTMLMediaElement = document.createElement(tagName) as any

    vE.src = fileSrc
    vE.autoplay = true
    vE.controls = true
    vE.muted = true
    vE['width'] = 300

    vE.style.position = 'fixed'
    vE.style.width = '300px'
    vE.style.zIndex = '3000'
    vE.style.top = '0'
    vE.style.left = '0'
    vE.style.visibility = 'hidden'

    return new Promise((ok, err) => vE.onloadedmetadata = (ev) => ok(Math.floor(vE.duration)))
}

const upLoadRequest = (options: UploadRequestOptions) => {

    const action = async () => {
        const file = options.file
        const videoSrc = URL.createObjectURL(file)
        const time = await getFileDuration(file, videoSrc)
        console.log('playing => 视频时长: ', time, '秒')

        const {name, size, type} = file

        const onUploadProgress = (event: ProgressEvent) => {
            options.onProgress({...event, percent: event.loaded / event.total * 100} as any)
        }

        const href = await uploadApi(file, onUploadProgress)
            .catch(err => options.onError(err))

        options.onSuccess({id: file['uid'] || Date.now(), href, name, size, type, time} as FileInfo)
    }
    action()
}

// 预览
const {isShow, onPreview, file} = useFilePreview()

</script>

<template>
    <el-upload
        :file-list="fileList"
        :http-request="upLoadRequest"
        :on-preview="file => onPreview(file)"
        :on-remove="onRemove"
        :on-success="onUploadSuccess"
        style="width: 100%;"
        v-bind="$attrs">
        <!-- 上传控制区域 -->
        <slot>
            <div v-if="$attrs.drag && $attrs.listType !== 'picture-card'">
                <el-icon class="el-icon--upload">
                    <UploadFilled />
                </el-icon>
                <div class="el-upload__text">
                    将文件拖放到此处或
                    <em>点击上传</em>
                </div>
            </div>
            <el-icon v-else-if="$attrs.listType === 'picture-card'">
                <Plus />
            </el-icon>
            <el-button v-else type="primary">点击上传</el-button>
        </slot>

        <!-- TIPS -->
        <template #tip>
            <div class="el-upload__tip">
                {{ tips || 'jpg/png 小于 500KB 的文件。' }}
            </div>
        </template>

        <!-- 预览弹框 -->
        <el-dialog v-model="isShow"
                   append-to-body
                   close-on-click-modal
                   destroy-on-close
                   draggable
                   lock-scroll
                   modal
                   width="45%">
            <ShowFile :file="file" />
        </el-dialog>

    </el-upload>
</template>
