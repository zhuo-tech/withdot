<script lang="ts" setup>
import ProgressBar from '@/components/VideoPlay/components/ProgressBar.vue'
import { ControlLayer } from '@/components/VideoPlay/service/ControlLayer'
import { VideoPlayer } from '@/components/VideoPlay/service/VideoPlayer'
import { inject, reactive } from 'vue'
import { TimeUnit } from 'typescript-util'

const service = inject(VideoPlayer.INJECTION_KEY) as VideoPlayer

const controlLayer = reactive(new ControlLayer())

const {videoElement, playerBoxElement, minDuration} = service

</script>

<template>
<div class="video-control"
     @mouseout="controlLayer.close()"
     @mouseover="controlLayer.show()">
    <!-- 顶部 -->
    <div v-show="controlLayer.isShow" class="header">
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
    <div v-show="controlLayer.isShow" class="footer">
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
                <el-icon @click="videoElement.togglePlayState()">
                    <video-play v-show="!videoElement.playing" />
                    <video-pause v-show="videoElement.playing" />
                </el-icon>
            </div>
            <div class="right">
                <el-tooltip class="box-item" placement="top">
                    <el-icon><headset /></el-icon>
                    <template #content>
                        <el-slider v-model="videoElement.volume" height="200px" vertical />
                    </template>
                </el-tooltip>

                <!-- 全屏按钮 -->
                <el-icon @click="playerBoxElement.toggleFullScreen()">
                    <full-screen />
                </el-icon>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped src="../style/ControlStyle.sass" />
