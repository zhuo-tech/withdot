<script lang="ts" setup>
import { TimeUnit } from 'typescript-util'
import { reactive } from 'vue'
import { ControlLayer } from './context/ControlLayer'
import { ControlModel } from './service/ControlModel'
import DoubleSpeed from './components/DoubleSpeed.vue'
import ProgressBar from './components/ProgressBar.vue'

/**
 * 控制器层
 */
const props = defineProps<{
    model: ControlModel
}>()
const controlLayer = reactive(new ControlLayer())

function togglePlaybackState() {
    if (props.model?.playing) {
        props.model.pause?.()
    } else {
        props.model.play?.()
    }
}

</script>

<template>
<div class="video-control"
     @mousemove="controlLayer.show()"
     @mouseout="controlLayer.close()"
     @mouseover="controlLayer.show()"
     @click.self="togglePlaybackState">

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
        <ProgressBar :buffer-value="model.bufferTime"
                     :max="model.maxTime"
                     :format-tips="(t) => TimeUnit.SECOND.display(t)"
                     :min="model.minTime"
                     :value="model.time"
                     @change="time => model.setPlayTime?.(time)">
        </ProgressBar>
        <!-- 控制按钮 -->
        <div class="buttons">
            <div class="left">
                <!-- 播放按钮 -->
                <el-tooltip placement="top">
                    <el-icon @click.stop="togglePlaybackState">
                        <video-play v-show="!model.playing" />
                        <video-pause v-show="model.playing" />
                    </el-icon>
                    <template #content>
                        <span v-show="!model.playing">播放</span>
                        <span v-show="model.playing">暂停</span>
                    </template>
                </el-tooltip>
                <!-- 时间 -->
                <div class="time">
                    {{ TimeUnit.SECOND.display(model.time) }} /
                    {{ TimeUnit.SECOND.display(model.maxTime) }}
                </div>
            </div>
            <div class="right">
                <!-- 倍速 -->
                <DoubleSpeed v-model:value="model.playbackRate" />
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
                        <el-slider v-model="model.volume" height="200px" vertical />
                    </template>
                </el-tooltip>

                <!-- 全屏 -->
                <el-tooltip placement="top">
                    <el-icon @click="() => model.toggleFullScreen?.()">
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

<style scoped src="./style/ControlStyle.sass" />
