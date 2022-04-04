<script lang="ts" setup>
import { onMounted, reactive, watchEffect, ref } from 'vue'
import { VideoPlayerScript } from './service/VideoPlayerScript'

const player = reactive(new VideoPlayerScript())
const {videoElement, progress} = player

const playStatus = reactive({
    // 很危险, 如果 status 和 videoElement.paused 状态不一致, 这里切换始终是反的
    status: false,
    play() {
        this.status = true
        videoElement.play()
    },
    pause() {
        this.status = false
        videoElement.pause()
    },
    toggle() {
        this.status = !this.status
        videoElement.togglePlayState()
    },
})

onMounted(() => {
    // 初始化播放状态
    playStatus.status = !videoElement.paused
    // 待到资源就绪后, 初始化进度条长度
    videoElement.isReady(() => {
        const max = videoElement.videoDuration
        progress.max = isNaN(max) ? 0 : max
    })
})
// TODO: 播放状态, 播放进度, 音量; 数据响应
// watchEffect(() => {
//     console.debug('进度变化', player.progress.value)
//     videoElement.currentTime = player.progress.value
// }, {flush: 'post'})

</script>

<template>
<div :ref="player.setPlayerBox" class="player-box">
    <div class="video-wrapper">
        <!--suppress JSUndeclaredVariable -->
        <video :ref="(e) => videoElement.setElement(e)" src="./resource/v1.mp4"></video>
    </div>
    <div class="suspended-layer">
        <!-- 控制器 -->
        <div class="video-control">
            <!-- 顶部 -->
            <div class="header">
                <div class="buttons">
                    <!-- 更多 -->
                    <el-icon>
                        <more-filled />
                    </el-icon>
                    <el-icon>
                        <operation />
                    </el-icon>
                    <!-- 设置 -->
                    <el-icon>
                        <tools />
                    </el-icon>
                </div>
            </div>

            <!-- 底部 -->
            <div class="footer">
                <!--进度条-->
                <el-slider v-model="player.progress.value" size="small" :max="progress.max" :min="progress.min" />
                <!-- 控制按钮 -->
                <div class="buttons">
                    <div class="left">
                        <el-icon @click="playStatus.toggle()">
                            <video-play v-show="!playStatus.status" />
                            <video-pause v-show="playStatus.status" />
                        </el-icon>
                    </div>
                    <div class="right">
                        <!-- 放大缩小 -->
                        <el-icon>
                            <zoom-in />
                        </el-icon>
                        <el-icon>
                            <zoom-out />
                        </el-icon>
                        <!-- 全屏按钮 -->
                        <el-icon @click="player.toggleFullScreen()">
                            <full-screen />
                        </el-icon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<style lang="sass" scoped src="./style.sass"></style>
