<template>
    <div style="border: 1px solid #ccc">
        <Toolbar
            :defaultConfig="toolbarConfig"
            :editor="editorRef"
            mode="default"
            style="border-bottom: 1px solid #ccc"
        />
        <Editor
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            mode="default"
            style="height: 500px; overflow-y: hidden;"
            @onCreated="handleCreated"
        />
    </div>
</template>
<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css'
import { FileService, INJECT_KEY_FILE_SERVICE } from '@/service/FileService'
import { IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
// 引入 css
import { onBeforeUnmount, ref, shallowRef, watch, inject, computed } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const props = defineProps({
    value: {
        type: String,
        required: true,
    },
})

const emits = defineEmits(['changeValue'])
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: ['fullScreen'],
}

// 内容 HTML
let valueHtml = ref('')

const fileService: FileService = inject(INJECT_KEY_FILE_SERVICE) as FileService

const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    MENU_CONF: {
        uploadImage: {
            // 自定义上传
            async customUpload(file: File, insertFn: any) {
                console.log(file, '文件')
                const res = await fileService.upload(file)
                console.log(res)
                // file 即选中的文件
                // 自己实现上传，并得到图片 url alt href
                // 最后插入图片
                // insertFn(url, alt, href)
                // fileService.showUrl(res.href)
                insertFn(fileService.showUrl(res.href))
            },

        },
    },
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) {
        return
    }
    editor.destroy()
})

const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
const setValue = () => {
    if (props.value) {
        valueHtml.value = props.value
        return
    }
    return
}
watch(() => props.value, (newValue) => {
    valueHtml.value = newValue
})
watch(() => valueHtml.value, (newValue) => {
    emits('changeValue', newValue)
})

setValue()

</script>
