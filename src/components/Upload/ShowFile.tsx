// noinspection JSXNamespaceValidation

import { FileServiceImpl } from '@/components/Upload/FileServiceImpl'
import { getLogger } from '@/main'
import { FileInfo } from '@/model/FileInfo'
import { FileType, FileTypeRegExp } from '@/model/FileType'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { ObjectUtil, StrUtil } from 'typescript-util'
import { defineComponent } from 'vue'
// import { ImageProps } from 'element-plus'

/**
 * 兼容多种类型的文件展示
 */
export default defineComponent({
    name: 'ShowFile',
    props: {
        file: {
            type: [FileInfo, Object],
            required: false,
        },
        href: {
            type: String,
            required: false,
        },
        hrefType: {
            type: String,
            default: FileType.IMAGE,
        },
    },
    data() {
        return {
            fileService: new FileServiceImpl(),
            log: getLogger('ShowFile'),
        }
    },
    methods: {
        renderImage(src: string) {
            const imageSlots = {
                error: () => (
                    <div class="image-slot">
                        <el-icon><IconPicture /></el-icon>
                    </div>
                ),
            }
            return <el-image src={ src } { ...this.$attrs } v-slots={ imageSlots }></el-image>
        },

        renderVideo(src: string) {
            return (<span>{ src }</span>)
            // return <video src={ src } controls muted  { ...this.$attrs } ></video>
        },

        renderAudio(src: string) {
            // this.log.info('接收到的样式', this.$attrs)
            return <audio src={ src } controls { ...this.$attrs } ></audio>
        },

        renderByType(src: string, type: string) {
            if (!src) {
                this.log.debug('地址不存在 src = ', src)
                return <span></span>
            }
            this.log.debug('渲染类型', type)

            src = this.fileService.showUrl(src)
            // 图片
            if (FileTypeRegExp.IMAGE.test(type)) {
                return this.renderImage(src)
            }
            if (FileTypeRegExp.VIDEO.test(type)) {
                return this.renderVideo(src)
            }
            if (FileTypeRegExp.AUDIO.test(type)) {
                return this.renderAudio(src)
            }

            return (
                <span>
                    不支持的类型 { type }
                </span>
            )
        },
    },
    render() {
        const {file, href, hrefType} = this.$props
        if (StrUtil.isNotEmpty(href)) {
            return this.renderByType(href as string, hrefType)
        }

        if (ObjectUtil.isNotEmpty(file)) {
            return this.renderByType(file?.href, file?.type)
        }

        return <span></span>
    },
})
