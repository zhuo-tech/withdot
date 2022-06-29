<!--suppress JSUnusedLocalSymbols -->
<script lang="tsx" setup>
import ShowFile from '@/components/Upload/ShowFile'
import { UploadFileService } from '@/components/Upload/UploadFile'
import { useFilePreview } from '@/components/Upload/useFilePreview'
import { FileInfo } from '@/model/FileInfo'
import { FileService } from '@/service/FileService'
// noinspection ES6UnusedImports
import { UploadFilled } from '@element-plus/icons-vue'
import { UploadProps, UploadUserFile } from 'element-plus'

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

const {fileList, upLoadRequest, onRemove, onUploadSuccess} = new UploadFileService(props, emits)

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
