<script lang="ts" setup>
import DoubleSpeed from '@/components/VideoPlayer/components/DoubleSpeed.vue'
import { ControlModel } from '@/components/VideoPlayer/hooks/useVideo'
import { TimeUnit } from 'typescript-util'
import { unref } from 'vue'

const props = defineProps<{ playerRef: ControlModel }>()

</script>

<template>
<div class="toolbar">
    <!-- 播放按钮 -->
    <el-tooltip placement="top">
        <el-icon @click.stop="playerRef.togglePlayState()">
            <video-play v-show="!playerRef.playing" />
            <video-pause v-show="playerRef.playing" />
        </el-icon>
        <template #content>
            <span v-show="!playerRef.playing">播放</span>
            <span v-show="playerRef.playing">暂停</span>
        </template>
    </el-tooltip>
    <!-- 时间 -->
    <div class="time">
        {{ TimeUnit.SECOND.display(unref(playerRef.playTime)) }}
        /
        {{ TimeUnit.SECOND.display(unref(playerRef.maxDuration)) }}
    </div>
    <!-- 倍速 -->
    <DoubleSpeed v-model:value="playerRef.playbackRate" />
    <!-- 音量 -->
    <el-slider v-model="playerRef.volume" height="200px" style="max-width: 150px" />
    <!-- 全屏 -->
    <el-tooltip placement="top">
        <el-icon @click="() => playerRef.toggleFullScreen?.()">
            <full-screen />
        </el-icon>
        <template #content>
            切换全屏
        </template>
    </el-tooltip>
</div>
</template>

<style lang="sass" scoped>
.toolbar
    display: flex
    justify-content: center
    box-shadow: 0 0 10px rgba(110, 110, 111, .3)
    margin-bottom: 15px
    padding-top: 5px

    .el-icon
        font-size: 26px
        line-height: 32px

.toolbar > *
    margin: 0 20px

</style>
