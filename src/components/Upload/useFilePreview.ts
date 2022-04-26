import { FileInfo } from '@/model/FileInfo'
import { UploadProps } from 'element-plus'
import { ObjectUtil } from 'typescript-util'
import { ref, Ref } from 'vue'

export type FilePreviewReturn = {
    onPreview: UploadProps['onPreview']
    isShow: Ref<boolean>
    file: Ref<FileInfo>
    show(): void
    close(): void
}

/**
 * useFilePreview
 * @author LL
 * @date 2022-04-25 上午 12:40
 **/
export function useFilePreview(intiValue: FileInfo = {} as any): FilePreviewReturn {
    const isShow = ref(false)
    const file = ref(intiValue)

    const show = () => isShow.value = true
    const close = () => isShow.value = false
    return {
        isShow,
        file,
        show,
        close,
        onPreview(f) {
            if (ObjectUtil.isEmpty(f)) {
                return
            }
            file.value = f.response as FileInfo
            show()
        },
    }
}
