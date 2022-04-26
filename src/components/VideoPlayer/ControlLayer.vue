<script lang="ts" setup>
import { TimeUnit } from 'typescript-util'
import { unref } from 'vue'
import DoubleSpeed from './components/DoubleSpeed.vue'
import ProgressBar from './components/ProgressBar.vue'
import { useControlLayer } from './hooks/useControlLayer'
import { ControlModel } from './hooks/useVideo'

/**
 * 控制器层
 */
const props = defineProps<{ show: boolean, model: ControlModel }>()
const controlLayer = useControlLayer(props)
</script>

<template>
<div class="video-control"
     @mousemove="controlLayer.show()"
     @mouseout="controlLayer.close()"
     @mouseover="controlLayer.show()"
     @click.self="model.togglePlayState()">

    <!-- 顶部 -->
    <div v-if="show" :class="{ 'opaque': controlLayer.isShow }" class="header">
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
    <div v-if="show" :class="{ 'opaque': controlLayer.isShow }" class="footer">
        <!--进度条-->
        <ProgressBar :buffer-value="model.bufferTime"
                     :format-tips="(t) => TimeUnit.SECOND.display(t)"
                     :max="model.maxDuration"
                     :min="model.minTime"
                     :value="model.playTime"
                     @change="time => model.setPlayTime?.(time)">
        </ProgressBar>
        <!-- 控制按钮 -->
        <div class="buttons">
            <div class="left">
                <!-- 播放按钮 -->
                <el-tooltip placement="top">
                    <el-icon @click.stop="model.togglePlayState()">
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
                    {{ TimeUnit.SECOND.display(unref(model.playTime)) }} /
                    {{ TimeUnit.SECOND.display(unref(model.maxDuration)) }}
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
