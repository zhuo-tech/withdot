<script lang="ts" setup>
import VideoControl from '@/components/VideoPlay/components/Control.vue'
import { VideoPlayer } from '@/components/VideoPlay/service/VideoPlayer'
import { provide, reactive } from 'vue'

const service = reactive(new VideoPlayer())
provide(VideoPlayer.INJECTION_KEY, service as any)

const {playerBoxElement, videoElement} = service
</script>

<template>
<div :ref="(e) => playerBoxElement.setElement(e)" class="player-box">
    <div class="video-wrapper">
        <video :ref="(e) => videoElement.setElement(e)" src="./resource/test.mp4"></video>
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
