import { getUserInfo } from '@/api/token'
import { getLogger } from '@/main'
import { CoreDot, CoreDotType, DotDisplayType } from '@/model/entity/CoreDot'
import CoreMaterial from '@/model/entity/CoreMaterial'
import { CoreWork } from '@/model/entity/CoreWork'
import { AddLocation, Comment, Crop, Document, ElementPlus, Link, PictureFilled } from '@element-plus/icons-vue'
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

export type PropsType = {
    data: CoreWork & { material: CoreMaterial }
}

/**
 * 视频编辑器
 * @author LL
 * @date 2022年04月11日 15点04分
 */
export class VideoEditorContext {
    // noinspection JSUnusedLocalSymbols
    private readonly log = getLogger(VideoEditorContext.name)
    // noinspection JSUnusedLocalSymbols
    private readonly client = new LafClient<CoreDot>(CoreDot.TABLE_NAME)
    private readonly props: PropsType
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

    constructor(props: PropsType) {
        this.props = props

        ObjectUtil.toArray(CoreDotType)
            .forEach((kv, index) => {
                const dot = new CoreDot()
                dot.type = kv.value
                dot._id = String(index)
                dot.label = kv.key
                dot.display = index % 2 === 0 ? DotDisplayType.BUTTON : DotDisplayType.EXPANDED
                dot.createTime = Date.now()
                dot.position = {z: index % 3} as any

                this.pointList.push(dot)
            })
    }

    public createDot(dto: CoreDot, startTime: number) {
        const {_id: workId} = this.props.data

        // 基础信息初始化
        dto.workId = workId
        dto.type = this.currentType
        dto.position = {} as any
        dto.start = startTime

        this.pointList.push(dto)
    }

    public async saveDot(dto: CoreDot) {
        dto.createTime = Date.now()
        dto.updateTime = Date.now()
        dto.createBy = (await getUserInfo())?._id as string

        await this.client.insert(dto)
    }

}
