import { PlayerContext } from '@/components/VideoPlayer/context/PlayerContext'
import { getLogger } from '@/main'
import { CoreDot, CoreDotType, DotDisplayType } from '@/model/entity/CoreDot'
import { AddLocation, Comment, Crop, Document, ElementPlus, Link, PictureFilled } from '@element-plus/icons-vue'
import { InjectionKey } from '@vue/runtime-core'
import { LafClient } from 'laf-db-query-wrapper'
import { ObjectUtil } from 'typescript-util'
import { reactive } from 'vue'

export const DotTypeOption: Array<{ icon: any, type: CoreDotType, label: string }> = [
    {icon: Document, type: CoreDotType.题目, label: '题目'},
    {icon: AddLocation, type: CoreDotType.书签, label: '书签'},
    {icon: PictureFilled, type: CoreDotType.图片, label: '图片'},
    {icon: Comment, type: CoreDotType.文本, label: '文本'},
    {icon: Crop, type: CoreDotType.热区, label: '热区'},
    {icon: ElementPlus, type: CoreDotType.表单, label: '表单'},
    {icon: Link, type: CoreDotType.链接, label: '链接'},
]

/**
 * 视频编辑器
 * @author LL
 * @date 2022年04月11日 15点04分
 */
export class VideoEditorContext {
    public static readonly INJECTION_KEY: InjectionKey<PlayerContext> = Symbol.for(VideoEditorContext.name)
    // noinspection JSUnusedLocalSymbols
    private log = getLogger(VideoEditorContext.name)
    // noinspection JSUnusedLocalSymbols
    private readonly client = new LafClient<CoreDot>(CoreDot.TABLE_NAME)
    /**
     * 当前打点类型
     */
    public currentType: CoreDotType = CoreDotType.题目

    public pointList = reactive<Array<CoreDot>>([])

    public controlDrawer = {
        isShow: false,
        show() {
            this.isShow = true
        },
        close() {
            this.isShow = false
        },
    }

    constructor() {
        ObjectUtil.toArray(CoreDotType)
            .filter((t, i) => i < 3)
            .forEach((kv, index) => {
                let dot = new CoreDot()
                dot.type = kv.value
                dot._id = String(index)
                dot.label = kv.key
                dot.display = index % 2 === 0 ? DotDisplayType.BUTTON : DotDisplayType.EXPANDED
                dot.createTime = Date.now()
                this.pointList.push(dot)
            })
    }

}
