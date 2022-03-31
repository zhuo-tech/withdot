<!--suppress JSUnusedLocalSymbols -->
<script lang="tsx" setup>
import { LafUploadResponse } from '@/components/Upload/Upload'
import { getLogger } from '@/main'
import { FileInfo } from '@/pages/materials/Material'
import { UploadFile, UploadFiles, UploadProps, UploadUserFile } from 'element-plus'
import { CollUtil, ObjectUtil, StrUtil } from 'typescript-util'
import { defineEmits, defineProps, reactive, watchEffect } from 'vue'
import { FileService } from './FileService'
import { FileServiceImpl } from './FileServiceImpl'
// noinspection ES6UnusedImports
import { UploadFilled } from '@element-plus/icons-vue'
/**
 * 对 el-upload 的包装,
 * 绝大部分 el-upload 的 props 通过props 透传给 el-upload 参考: {@link UploadProps}
 * 提供四种 v-model:
 * - v-model:href 单URL, string
 * - v-model:hrefs string[]
 * - v-model:fileInfo 单个完整文件信息, {@link FileInfo}
 * - v-model:fileInfos 多个
 *
 * <h3>
 *     不要传递 action, headres 等 上传控制属性, 仅可以传递上传样式控制属性
 *</h3>
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
}>()

const log = getLogger('UploadFile')
const fileService: FileService = new FileServiceImpl()

let fileList = reactive<Array<UploadUserFile>>([])
const {href, hrefs, fileInfo, fileInfoList} = propsValue

function fileInfoToUploadFile() {
    return (fileInfo: FileInfo) => {
        const {id, href, size, type, name} = fileInfo
        return {size, name, uid: id, url: fileService.showUrl(href), response: fileInfo, status: 'success',} as UploadUserFile
    }
}

function strToUploadFile() {
    return (s: any) => ({
        response: {href: s},
        status: 'success',
        name: s,
        size: 0,
        url: fileService.showUrl(s),
        uid: s,
    } as UploadUserFile)
}

watchEffect(() => {
    if (CollUtil.isNotEmpty(fileList)) {
        return
    }
    if (CollUtil.isNotEmpty(fileInfoList)) {
        // @ts-ignore
        fileList = fileInfoList?.map(fileInfoToUploadFile())
        return
    }
    if (ObjectUtil.isNotEmpty(fileInfo)) {
        // @ts-ignore
        fileList = [fileInfoToUploadFile()(fileInfo)]
        return
    }
    if (CollUtil.isNotEmpty(hrefs)) {
        // @ts-ignore
        fileList = hrefs?.map(strToUploadFile())
    }
    if (StrUtil.isNotEmpty(href)) {
        // @ts-ignore
        fileList = strToUploadFile()(href)
    }
})

const onUploadSuccess = (response: LafUploadResponse, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    uploadFile.response = fileService.formatResponse(response, uploadFile.raw)
    log.trace('上传完成, 格式化响应', uploadFile.response)
    updateModel(uploadFiles, propsValue)
}

const onRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    log.trace('移除文件', uploadFile.response)
    updateModel(uploadFiles, propsValue)
}

function updateModel(fileList: UploadFiles, propValue: typeof propsValue) {
    if (CollUtil.isEmpty(fileList)) {
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
}


</script>

<template>
<el-upload :action="fileService.getActionUploadUrl()"
           :headres="fileService.getActionUploadHeaders()"
           :on-remove="onRemove"
           :on-success="onUploadSuccess"
           :file-list="fileList"
           style="width: 100%;"
           v-bind="$attrs">
    <slot>
        <el-button v-if="!$attrs.drag" type="primary">点击上传</el-button>
        <div v-if="$attrs.drag">
            <el-icon class="el-icon--upload">
                <UploadFilled/>
            </el-icon>
            <div class="el-upload__text">
                将文件拖放到此处或 <em>点击上传</em>
            </div>
        </div>

    </slot>

    <template #tip>
        <div class="el-upload__tip">
            {{ tips || 'jpg/png 小于 500KB 的文件。' }}
        </div>
    </template>

</el-upload>
</template>
