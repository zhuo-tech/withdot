<script setup lang="ts">
import { PlayerContext } from '@/components/VideoPlayer/context/PlayerContext'
import { inject } from 'vue'

/**
 * 包裹 video 标签
 * 提供:
 *  - video dom 对象注册
 *  - TODO: 控制视频视频缩放比
 *  - TODO: 处理视频资源加载, 清晰度切换
 */
const service = inject(PlayerContext.INJECTION_KEY) as PlayerContext
</script>
<template>
<div class="video-wrapper">
    <video :ref="el => service.videoElement.setElement(el)" src="../resource/test.mp4"></video>
</div>
</template>

<style scoped lang="sass">
.video-wrapper
    display: flex
    justify-content: center
    align-items: center

    background-color: #000

    video
        flex: 0 1 auto
        height: 100%
</style>
