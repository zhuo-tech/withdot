<script lang="tsx">
import { FileServiceImpl } from '@/components/Upload/FileServiceImpl'
import { getLogger } from '@/main'
import { FileInfo } from '@/model/FileInfo'
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
            default: 'image/*'
        }
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
                        <el-icon><IconPicture/></el-icon>
                    </div>
                )
            }
            return (
                <el-image src={this.fileService.showUrl(src)} {... this.$attrs} v-slots={imageSlots}></el-image>
            )
        },

        renderByType(src?: string, type?: string) {
            if (!src) {
                this.log.debug('地址不存在 src = ', src)
                return <span></span>
            }
            this.log.debug('渲染类型', type)
            // 图片
            if (type?.startsWith('image/')) {
                return this.renderImage(src)
            }

            // TODO: 视频, 音频 待支持

            return (
                <span>
                    不支持的文件类型 {type}
                </span>
            )
        },
    },
    render() {
        const {file, href, hrefType} = this.$props
        if (StrUtil.isNotEmpty(href)) {
            return this.renderByType(href, hrefType)
        }

        if (ObjectUtil.isNotEmpty(file)) {
            return this.renderByType(file?.href, file?.type)
        }

        return <span></span>
    },
})
</script>
