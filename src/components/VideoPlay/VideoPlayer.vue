<script lang="ts" setup>
import VideoControl from '@/components/VideoPlay/components/Control.vue'
import { VideoPlayer } from '@/components/VideoPlay/service/VideoPlayer'
import { provide, reactive } from 'vue'

const service = reactive(new VideoPlayer())
provide(VideoPlayer.INJECTION_KEY, service as any)


const src = "https://7dd2f8e8-6102-492c-a522-b5a7db2ab00a.lafyun.com/file/public/7c10f869-f6a2-4900-9bce-14920b31b426.mp4"

const {playerBoxElement, videoElement} = service
</script>

<template>
<div :ref="(e) => playerBoxElement.setElement(e)" class="player-box">
    <div class="video-wrapper">
        <video :ref="(e) => videoElement.setElement(e)" :src="src"></video>
    </div>
    <div class="suspended-layer">
        <!-- 控制器 -->
        <VideoControl>
            <span>2333333</span>
        </VideoControl>
    </div>
</div>
</template>

<style lang="sass" scoped src="./VideoPlayerStyle.sass"></style>
