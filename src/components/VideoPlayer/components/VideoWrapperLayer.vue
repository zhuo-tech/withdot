<script lang="ts" setup>
import { computed, inject } from 'vue'
import { PlayerContext } from '../context/PlayerContext'
import { ExtendedState, MediaReadyState } from '../service/VideoWrapper'

/**
 * 包裹 video 标签
 * 提供:
 *  - video dom 对象注册
 *  - TODO: 控制视频缩放比
 *  - TODO: 处理视频资源加载, 清晰度切换
 *  - TODO: 加载中状态
 *  @inject service {@link PlayerContext}
 */
const service = inject(PlayerContext.INJECTION_KEY) as PlayerContext

const showEnd = computed(() => {
    if (service.videoElement.playing) {
        return false
    }
    return service.videoElement.status === ExtendedState.PLAY_FINISHED
})

</script>
<template>
<div v-loading=" service.videoElement.status < MediaReadyState.HAVE_FUTURE_DATA" class="video-wrapper">
    <video :ref="el => service.videoElement.setElement(el)"
           src="../resource/test.mp4"
           @loadeddata="(event) => service.videoElement.onLoadedData(event)"
           @loadedmetadata="(event) => service.videoElement.onLoadMetaData(event)"
           @loadstart="(event) => service.videoElement.onLoadStart(event)"
           @timeupdate="service.videoElement.onTimeUpdate"></video>
</div>
<div v-show="showEnd" class="play-finished">
    <h1 class="relatively-centered" style="text-align: center; font-size: 40px; color: red">播放完成...........</h1>
</div>
</template>

<style lang="sass" scoped>
.video-wrapper
    height: 100%
    display: flex
    justify-content: center
    align-items: center

    background-color: #000

    video
        flex: 0 1 auto
        height: 100%

.play-finished
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0

.relatively-centered
    position: relative
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
</style>
