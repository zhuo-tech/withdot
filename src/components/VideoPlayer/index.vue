<script lang="ts" setup>
import { computed, ComputedRef, Ref, ref } from 'vue'
import ControlLayer from './ControlLayer.vue'
import { usePlayerBox } from './hooks/usePlayerBox'
import { ControlModel } from './hooks/useVideo'
import { AspectRatio } from './service/AspectRatio'
import VideoLayer from './VideoLayer.vue'

/**
 * 播放器
 */
const props = defineProps({
    aspectRatio: {type: AspectRatio, default: () => AspectRatio.DEFAULT},
    src: {type: String, required: true},
    pointList: {type: Array, default: () => ([])},
    showControl: {type: Boolean, default: true},
})
// ----------------------------------------------------------------------------------------

const videoLayer: Ref<Partial<ControlModel>> = ref({} as any)
const playerRef: Ref<HTMLDivElement> = ref({} as any)

const player = usePlayerBox(playerRef, props.aspectRatio)

const controlProp: ComputedRef<ControlModel> = computed<ControlModel>(() => ({
    ...videoLayer.value,
    minTime: 0,
    toggleFullScreen: player.toggleFullScreen,
}) as ControlModel)

defineExpose<ComputedRef<ControlModel>>(controlProp)
</script>

<template>
<!-- 最外层容器 -->
<div class="player-wrap">
    <!-- 持有绝对宽高 -->
    <div id="player" ref="playerRef">
        <VideoLayer ref="videoLayer" :src="src" />

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
