<script lang="ts" setup>
import { ControlModel } from '@/components/VideoPlayer/service/ControlModel'
import { CoreDot } from '@/model/entity/CoreDot'
import { defineExpose, onMounted, reactive, Ref, ref, unref } from 'vue'
import { ControlModelAdapter, PlayerContext } from './context/PlayerContext'
import { VideoWrapperContext } from './context/VideoWrapperContext'
import ControlLayer from './ControlLayer.vue'
import { AspectRatio } from './service/AspectRatio'
import StageLayer from './StageLayer.vue'
import VideoWrapperLayer from './VideoWrapperLayer.vue'

/**
 * 播放器
 * @props aspectRatio 播放器宽高比 {@link AspectRatio}
 * @props pointList 需要渲染的小组件列表 {@link Array<CoreDot>}
 */
const props = defineProps({
    aspectRatio: {
        type: AspectRatio,
        default: () => AspectRatio.DEFAULT,
    },
    src: {
        type: String,
        default: 'https://7dd2f8e8-6102-492c-a522-b5a7db2ab00a.lafyun.com/file/public/2af6438d-846d-4fb7-b385-0dd7e23686b4.mp4',
    },
    pointList: {
        type: Array,
        default: () => ([]),
    },
    playTime: {
        type: Number,
        default: 0,
    },
    showControl: {
        type: Boolean,
        default: true,
    },
})

const emits = defineEmits<{
    (event: 'update:playTime', time: number): void
}>()

const context: PlayerContext = reactive(new PlayerContext(props)) as any
const videoRef: VideoWrapperContext = ref({}) as any

const controlProp: Ref<ControlModel> = ref({} as any)
onMounted(() => controlProp.value = new ControlModelAdapter(unref(videoRef), context.playerBoxElement))

defineExpose(controlProp)
</script>

<template>
<!-- 最外层容器 -->
<div class="player-wrap">
    <!-- 持有绝对宽高 -->
    <div id="player" :ref="el => context.playerBoxElement.setElement(el)">

        <!--suppress JSUndeclaredVariable -->
        <VideoWrapperLayer :ref="el => videoRef = el" :src="src" />
        <!--suppress RequiredAttributes -->
        <ControlLayer v-if="showControl" :model="controlProp" />

        <div class="stage-wrapper">
            <slot :box="context.boxWidthHeight" :list="pointList" name="stage">
                <StageLayer :list="pointList" />
            </slot>
        </div>
    </div>
</div>
</template>

<style lang="sass" scoped>
.player-wrap
    height: 100%

#player
    position: relative

    .stage-wrapper
        pointer-events: none

#player > *
    position: absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
</style>
