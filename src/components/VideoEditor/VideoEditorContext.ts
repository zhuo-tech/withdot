import { PlayerContext } from '@/components/VideoPlayer/context/PlayerContext'
import { CoreDot, CoreDotType } from '@/model/entity/CoreDot'
import { InjectionKey } from '@vue/runtime-core'
import { ObjectUtil } from 'typescript-util'
import { reactive } from 'vue'

/**
 * 视频编辑器
 * @author LL
 * @date 2022年04月11日 15点04分
 */
export class VideoEditorContext {
    public static readonly INJECTION_KEY: InjectionKey<PlayerContext> = Symbol.for(VideoEditorContext.name)

    /**
     * 播放器
     */
    public playerContext: PlayerContext = new PlayerContext()

    public actionList = reactive({
        currentType: CoreDotType.题目,
        options: ObjectUtil.toArray(CoreDotType),
    })

    public pointList = reactive<Array<CoreDot>>([])

    constructor() {
        this.pointList.push(new CoreDot())
    }
}
