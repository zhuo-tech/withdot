<script lang="ts" setup>
import { TimeUnit } from 'typescript-util'
import { reactive } from 'vue'
import { ControlLayer } from '../context/ControlLayer'
import DoubleSpeed from './DoubleSpeed.vue'
import ProgressBar from './ProgressBar.vue'

/**
 * 控制器层
 * @props playTime {number} 播放时间
 * @props PlaybackRate {number} 播放速率
 * @props volume {number} 音量
 * @props buffTime {number} 缓冲时间
 * @props minDuration {number} 最小播放时间
 * @props maxDuration {number} 最大播放时间
 */
const props = defineProps({
    playTime: {
        type: Number,
        default: 0,
    },
    playbackRate: {
        type: Number,
        default: 1,
    },
    volume: {
        type: Number,
        default: 100,
    },
    bufferTime: {
        type: Number,
        default: 1,
    },
    minDuration: {
        type: Number,
        default: 0,
    },
    maxDuration: {
        type: Number,
        default: 0,
    },
    playing: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits<{
    (event: 'update:playbackRate', time: number): void
    (event: 'update:volume', time: number): void
    (event: 'update:playing', status: boolean): void
    (event: 'timeChange', time: number): void
    (event: 'fullScreenToggle'): void
}>()

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
        <ProgressBar v-model:value="playTime"
                     :buffer-value="bufferTime"
                     :format-tips="(t) => TimeUnit.SECOND.display(t)"
                     :max="maxDuration"
                     :min="minDuration"
                     @change="time => emits('timeChange', time)">
            <slot></slot>
        </ProgressBar>
        <!-- 控制按钮 -->
        <div class="buttons">
            <div class="left">
                <!-- 播放按钮 -->
                <el-tooltip placement="top">
                    <el-icon @click="() => emits('update:playing', !playing)">
                        <video-play v-show="!playing" />
                        <video-pause v-show="playing" />
                    </el-icon>
                    <template #content>
                        <span v-show="!playing">播放</span>
                        <span v-show="playing">暂停</span>
                    </template>
                </el-tooltip>
                <!-- 时间 -->
                <div class="time">
                    {{ TimeUnit.SECOND.display(playTime) }} /
                    {{ TimeUnit.SECOND.display(maxDuration) }}
                </div>
            </div>
            <div class="right">
                <!-- 倍速 -->
                <DoubleSpeed :value="playbackRate" @update:value="value => emits('update:playbackRate', value)" />
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
                        <el-slider :model-value="volume" height="200px" vertical @input="value => emits('update:volume', value)" />
                    </template>
                </el-tooltip>

                <!-- 全屏 -->
                <el-tooltip placement="top">
                    <el-icon @click="() => emits('fullScreenToggle')">
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
