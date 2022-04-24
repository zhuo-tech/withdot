import { getUserInfo } from '@/api/token'
import { getLogger } from '@/main'
import { CoreDot, CoreDotType } from '@/model/entity/CoreDot'
import CoreMaterial from '@/model/entity/CoreMaterial'
import { CoreWork } from '@/model/entity/CoreWork'
import { Debounce } from '@/tool/annotation/Decorator'
import { AddLocation, Comment, Crop, Document, ElementPlus, Link, PictureFilled } from '@element-plus/icons-vue'
import { LafClient } from 'laf-db-query-wrapper'
import { CollUtil, StrUtil } from 'typescript-util'
import { isRef, Ref, ref, watch } from 'vue'

export const DotTypeOption: Array<{ icon: any, type: CoreDotType, label: string }> = [
    {icon: Document, type: CoreDotType.题目, label: '题目'},
    {icon: AddLocation, type: CoreDotType.书签, label: '书签'},
    {icon: PictureFilled, type: CoreDotType.图片, label: '图片'},
    {icon: Comment, type: CoreDotType.文本, label: '文本'},
    {icon: Crop, type: CoreDotType.热区, label: '热区'},
    {icon: ElementPlus, type: CoreDotType.表单, label: '表单'},
    {icon: Link, type: CoreDotType.链接, label: '链接'},
]

export const DotTypeIconShow = CollUtil.toMap(DotTypeOption, i => i.type, i => i.icon)

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

    public pointList: Ref<Array<CoreDot>> = ref<Array<CoreDot>>([])

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

        this.initPointList()

        watch(() => this.props.data, (nv, ov) => {
            if (StrUtil.isEmpty(ov._id) && StrUtil.isNotEmpty(nv._id)) {
                this.initPointList()
            }
        }, {deep: true})
    }

    public createDot(dot: CoreDot) {
        dot.workId = this.props.data._id

        if (isRef(this.pointList)) {
            this.pointList.value.push(dot)
        } else {
            // @ts-ignore
            this.pointList.push(dot)
        }

        this.saveDot(dot)
            .then(dot => this.log.trace('保存基础信息', dot))
    }

    @Debounce(100)
    public update(dot: CoreDot) {
        dot.updateTime = Date.now()
        this.client.updateById(dot._id, dot, '_id')
            .then(() => this.log.debug('更新点信息完成', dot._id))
            .catch(err => this.log.error('更新点信息失败: ', err))
    }

    private initPointList() {
        const workId = this.props.data._id
        if (StrUtil.isEmpty(workId)) {
            return
        }
        this.client.queryWrapper()
            .eq('workId', workId)
            .list(9999)
            .then(list => this.pointList.value = list)
            .catch(err => this.log.warn('init point list => ', err))
    }

    private async saveDot(dot: CoreDot) {
        dot.createTime = Date.now()
        dot.updateTime = Date.now()
        dot.createBy = (await getUserInfo())?._id as string

        dot._id = await this.client.insert(dot) as string
        return dot
    }

}
