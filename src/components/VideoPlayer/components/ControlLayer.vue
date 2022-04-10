<script lang="ts" setup>
import { TimeUnit } from 'typescript-util'
import { inject, reactive } from 'vue'
import { ControlLayer } from '../context/ControlLayer'
import { PlayerContext } from '../context/PlayerContext'
import DoubleSpeed from './DoubleSpeed.vue'
import ProgressBar from './ProgressBar.vue'

/**
 * 控制器层
 * @inject service {@link PlayerContext}
 */
const service = inject(PlayerContext.INJECTION_KEY) as PlayerContext
const {videoElement, playerBoxElement, minDuration} = service
const controlLayer = reactive(new ControlLayer())

</script>

<template>
<div class="video-control"
     @mousemove="controlLayer.show()"
     @mouseout="controlLayer.close()"
     @mouseover="controlLayer.show()">
    <!-- 顶部 -->
    <div :class="{ 'opaque': controlLayer.isShow }"
         class="header"
         @mouseout="controlLayer.preventClosing=false"
         @mouseover="controlLayer.preventClosing=true">
        <div class="buttons">
            <!-- 更多 -->
            <el-icon>
                <more-filled />
            </el-icon>
            <el-icon>
                <operation />
            </el-icon>
        </div>
    </div>

    <!-- 底部 -->
    <div :class="{ 'opaque': controlLayer.isShow }"
         class="footer"
         @mouseout="controlLayer.preventClosing=false"
         @mouseover="controlLayer.preventClosing=true">
        <!--进度条-->
        <ProgressBar v-model:value="videoElement.playTime"
                     :max="videoElement.maxDuration"
                     :min="minDuration"
                     :tips-format="(t) => TimeUnit.SECOND.display(t)"
                     @change="(time) => videoElement.setPlayTime(time)">
            <slot></slot>
        </ProgressBar>
        <!-- 控制按钮 -->
        <div class="buttons">
            <div class="left">
                <!-- 播放按钮 -->
                <el-tooltip placement="top">
                    <el-icon @click="videoElement.togglePlayState()">
                        <video-play v-show="!videoElement.playing" />
                        <video-pause v-show="videoElement.playing" />
                    </el-icon>
                    <template #content>
                        <span v-show="!videoElement.playing">播放</span>
                        <span v-show="videoElement.playing">暂停</span>
                    </template>
                </el-tooltip>
                <!-- 时间 -->
                <div class="time">
                    {{ TimeUnit.SECOND.display(videoElement.playTime) }} /
                    {{ TimeUnit.SECOND.display(videoElement.maxDuration) }}
                </div>
            </div>
            <div class="right">
                <!-- 倍速 -->
                <DoubleSpeed v-model:value="videoElement.playbackRate" />

                <!-- 设置 -->
                <el-tooltip placement="top">
                    <el-icon>
                        <tools />
                    </el-icon>
                    <template #content>
                        设置
                    </template>
                </el-tooltip>

                <!-- 音量 -->
                <el-tooltip placement="top">
                    <el-icon>
                        <headset />
                    </el-icon>
                    <template #content>
                        <el-slider v-model="videoElement.volume" height="200px" vertical />
                    </template>
                </el-tooltip>

                <!-- 全屏 -->
                <el-tooltip placement="top">
                    <el-icon @click="playerBoxElement.toggleFullScreen()">
                        <full-screen />
                    </el-icon>
                    <template #content>
                        切换全屏
                    </template>
                </el-tooltip>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped src="../style/ControlStyle.sass" />
