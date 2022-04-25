<script lang="ts" setup>
import { ControlModelAdapter } from '@/components/VideoPlayer/context/ControlModelAdapter'
import { usePlayerBox } from '@/components/VideoPlayer/hooks/usePlayerBox'
import { ControlModel } from '@/components/VideoPlayer/service/ControlModel'
import { CoreDot } from '@/model/entity/CoreDot'
import { onMounted, Ref, ref, unref } from 'vue'
import { VideoWrapperContext } from './context/VideoWrapperContext'
import ControlLayer from './ControlLayer.vue'
import { AspectRatio } from './service/AspectRatio'
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
        required: true,
    },
    pointList: {
        type: Array,
        default: () => ([]),
    },
    showControl: {
        type: Boolean,
        default: true,
    },
})

const emits = defineEmits<{ (event: 'update:playTime', time: number): void }>()
// ----------------------------------------------------------------------------------------

const videoLayer: Ref<VideoWrapperContext> = ref({} as any)
const playerRef: Ref<HTMLDivElement> = ref({} as any)
const controlProp: Ref<ControlModel> = ref({} as any)

const player = usePlayerBox(playerRef, props.aspectRatio)

onMounted(() => {
    controlProp.value = new ControlModelAdapter(unref(videoLayer))
    controlProp.value.toggleFullScreen = player.toggleFullScreen
})

defineExpose(controlProp)
</script>

<template>
<!-- 最外层容器 -->
<div class="player-wrap">
    <!-- 持有绝对宽高 -->
    <div id="player" ref="playerRef">
        <VideoWrapperLayer ref="videoLayer" :src="src" />

        <ControlLayer :model="controlProp" :show="showControl" />

        <!--  预留 视频之上的悬浮层  -->
        <div class="stage-wrapper">
            <slot :list="pointList" name="stage">
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
