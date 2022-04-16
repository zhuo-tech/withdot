<!--suppress JSUnusedLocalSymbols -->
<script lang="tsx" setup>
import ShowFile from '@/components/Upload/ShowFile'
import { LafUploadResponse } from '@/components/Upload/Upload'
import { getLogger } from '@/main'
import { FileInfo } from '@/model/FileInfo'
// noinspection ES6UnusedImports
import { UploadFilled } from '@element-plus/icons-vue'
import { UploadFile, UploadFiles, UploadProps, UploadUserFile } from 'element-plus'
import { CollUtil, ObjectUtil, StrUtil } from 'typescript-util'
import { inject, reactive, watchEffect } from 'vue'
import { FileService, INJECT_KEY_FILE_SERVICE } from '@/service/FileService'

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
const propsValue = defineProps<{
    tips?: string
    href?: string
    hrefs?: Array<String>
    fileInfo?: FileInfo
    fileInfoList?: Array<FileInfo>
}>()

const emit = defineEmits<{
    (event: 'update:href', value: string): void
    (event: 'update:hrefs', value: Array<string>): void
    (event: 'update:fileInfo', value: FileInfo): void
    (event: 'update:fileInfoList', value: Array<FileInfo>): void
    (event: 'input', value: Array<UploadUserFile>): void
}>()

const log = getLogger('UploadFile')
const fileService: FileService = inject(INJECT_KEY_FILE_SERVICE) as FileService

let fileList = reactive<Array<UploadUserFile>>([])
const {href, hrefs, fileInfo, fileInfoList} = propsValue

// 处理回显
watchEffect(() => {
    const fileInfoToUploadFile = (fileInfo: FileInfo) => {
        const {id, href, size, type, name} = fileInfo
        return {size, name, uid: id, url: fileService.showUrl(href), response: fileInfo, status: 'success'} as UploadUserFile
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
        fileList = strToUploadFile(href)
    }
})

const onUploadSuccess = (response: LafUploadResponse, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    uploadFile.response = fileService.formatResponse(response, uploadFile.raw)
    log.trace('上传完成, 格式化响应', uploadFile.response)
    updateModel(uploadFiles, propsValue)
}
const onRemove = (uploadFile: UploadFile) => {
    log.trace('移除文件', uploadFile.response, '文件列表', fileList)
    updateModel(fileList as any, propsValue)
}

function updateModel(fileList: UploadFiles, propValue: typeof propsValue) {
    if (CollUtil.isEmpty(fileList)) {
        emit('update:href', StrUtil.EMPTY)
        emit('update:hrefs', [])
        emit('update:fileInfo', undefined as any)
        emit('update:fileInfoList', [])
        emit('input', [])
        return
    }
    const fileInfo = fileList.filter(i => i.status === 'success')
        .map(i => (i.response) as FileInfo)
    const value = fileInfo.map(i => i.href)
    log.trace('v-model 更新', value, fileInfo)

    emit('update:href', value[0] ?? StrUtil.EMPTY)
    emit('update:hrefs', value)
    emit('update:fileInfo', fileInfo[0])
    emit('update:fileInfoList', fileInfo)
    emit('input', fileList)
}

// 处理预览
const previewControl = reactive<{
    onPreview: UploadProps['onPreview']
    isShow: boolean
    file: FileInfo
    show: () => void
    close: () => void
}>({
    isShow: false,
    file: {} as FileInfo,
    show() {
        this.isShow = true
    },
    close() {
        this.isShow = false
    },
    onPreview(file) {
        if (ObjectUtil.isEmpty(file)) {
            return
        }
        this.file = file.response as FileInfo
        this.show()
    },
})

</script>

<template>
<el-upload :action="fileService.getActionUploadUrl()"
           :file-list="fileList"
           :headres="fileService.getActionUploadHeaders()"
           :on-preview="file => previewControl.onPreview(file)"
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
    <el-dialog v-model="previewControl.isShow"
               append-to-body
               close-on-click-modal
               destroy-on-close
               draggable
               lock-scroll
               modal
               width="45%">
        <ShowFile :file="previewControl.file" />
    </el-dialog>

</el-upload>
</template>

<style lang="less" scoped>
.fileStyle {
    position: relative;
    display: flex;
    align-items: center;

    audio {
        height: 50px;
    }

    .el-image {
        height: 80px;
    }

    video {
        height: 80px;
    }

    .el-upload-list__item-actions {
        z-index: 10;
        position: absolute;
        top: 50%;
        left: 85%;
        transform: translate(-50%, -50%);
        display: none;
    }

    .el-upload-list__item-delete {
        z-index: 10;
        position: absolute;
        top: 50%;
        left: 40px;
        transform: translate(-50%, -50%);
        display: none;
    }

    .cover {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        opacity: 0.2;
        display: none;
        background-color: #675f5f;
    }
}

.fileStyle:hover {
    .cover {
        display: block;
    }

    .el-upload-list__item-actions {
        display: block;
    }

    .el-upload-list__item-delete {
        display: block;
    }
}
</style>
