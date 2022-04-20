// noinspection JSXNamespaceValidation

import { getLogger } from '@/main'
import { FileInfo } from '@/model/FileInfo'
import { FileType, FileTypeRegExp } from '@/model/FileType'
import { FileService, INJECT_KEY_FILE_SERVICE } from '@/service/FileService'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { ObjectUtil, StrUtil } from 'typescript-util'
import { defineComponent } from 'vue'
// import { ImageProps } from 'element-plus'

/**
 * 兼容多种类型的文件展示
 * @inject {@link FileService}
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
            log: getLogger('ShowFile'),
            fileService: (this[INJECT_KEY_FILE_SERVICE] as any) as FileService,
            previewIsShow: false,
        }
    },
    inject: [
        INJECT_KEY_FILE_SERVICE,
    ],
    methods: {
        renderImage(src: string) {
            const imageSlots = {
                error: () => (
                    <div class="image-slot">
                        <el-icon><IconPicture /></el-icon>
                    </div>
                ),
            }
            return (
                <el-image src={ src } { ...this.$attrs } v-slots={ imageSlots } previewSrcList={ [src] } preview-teleported></el-image>
            )
        },

        renderVideo(src: string) {
            return (
                <span>
                    <el-icon onClick={ () => this.previewIsShow = true } size={ 50 }>
                        <video-play />
                    </el-icon>
                    <el-dialog v-model={ this.previewIsShow }
                               append-to-body
                               close-on-click-modal
                               destroy-on-close
                               draggable
                               lock-scroll
                               modal
                               width="50%">
                        <video style={ {minHeight: '500px'} } src={ src } controls autoplay { ...this.$attrs } ></video>
                    </el-dialog>
                </span>
            )
        },

        renderAudio(src: string) {
            if (this.previewIsShow) {
                return this.previewIsShow && <audio src={ src } controls { ...this.$attrs } ></audio>
            } else {
                return (
                    <el-icon onClick={ () => this.previewIsShow = true } size={ 50 }>
                        <headset />
                    </el-icon>
                )
            }
        },

        renderByType(src: string, type: string) {
            if (!src) {
                this.log.debug('地址不存在 src = ', src)
                return <span></span>
            }
            this.log.trace('渲染类型', type)

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
