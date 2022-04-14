<script lang="ts" setup>
import { CoreDot } from '@/model/entity/CoreDot'
import { reactive, ref } from 'vue'
import ControlLayer from './components/ControlLayer.vue'
import StageLayer from './components/StageLayer.vue'
import VideoWrapperLayer from './components/VideoWrapperLayer.vue'
import { PlayerContext } from './context/PlayerContext'
import { VideoWrapperContext } from './context/VideoWrapperContext'
import { AspectRatio } from './service/AspectRatio'

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
    pointList: {
        type: Array,
        default: () => ([]),
    },
})

const context: PlayerContext = reactive(new PlayerContext(props)) as any
const videoRef: VideoWrapperContext = ref({}) as any

</script>

<template>
<!-- 最外层容器 -->
<div class="player-wrap">
    <!-- 持有绝对宽高 -->
    <div id="player" :ref="el => context.playerBoxElement.setElement(el)">

        <!--suppress JSUndeclaredVariable -->
        <VideoWrapperLayer :ref="el => videoRef = el" />
        <!--suppress RequiredAttributes -->
        <ControlLayer v-model:playback-rate="videoRef.playbackRate"
                      v-model:volume="videoRef.volume"
                      :buffer-time="videoRef.bufferTime"
                      :max-duration="videoRef.maxDuration"
                      :min-duration="0"
                      :play-time="videoRef.playTime"
                      :playing="videoRef.playing"
                      @fullScreenToggle="context.playerBoxElement.toggleFullScreen()"
                      @timeChange="time => videoRef.setPlayTime(time)"
                      @update:playing="videoRef.togglePlayState()" />
        <div class="stage-wrapper">
            <slot name="stage" :list="pointList">
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

#player > *
    position: absolute
    width: 100%
    height: 100%
    top: 0
    left: 0

</style>
