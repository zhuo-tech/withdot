<script lang="ts" setup>
import { ControlModel, MediaReadyState, useVideo } from '@/components/VideoPlayer/hooks/useVideo'
import { ref, Ref } from 'vue'

/**
 * 包裹 video 标签
 * 提供:
 *  - video dom 对象注册
 *  - TODO: 处理视频资源加载, 清晰度切换
 */
const props = defineProps<{ src: string }>()

const videoRef: Ref<HTMLVideoElement> = ref({} as any)
const context = useVideo(videoRef)

defineExpose<Partial<ControlModel>>(context)
</script>

<template>
<div v-loading="context.status < MediaReadyState.HAVE_FUTURE_DATA" class="video-wrapper">
    <video ref="videoRef"
           :src="src"
           @loadeddata="(event) => context.onLoadedData(event)"
           @loadedmetadata="(event) => context.onLoadMetaData(event)"
           @loadstart="(event) => context.onLoadStart(event)"
           @timeupdate="context.onTimeUpdate"></video>
</div>
<div v-show="context.showEnd" class="play-finished">
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
