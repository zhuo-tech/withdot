<script lang="ts">
import { VideoPlayerScript } from '@/components/VideoPlay/service/VideoPlayerScript'
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            player: new VideoPlayerScript(this),
        }
    },
    mounted() {
        this.player.videoElement.isReady(() => this.player.initProgressMax())
    },
})
</script>

<template>
<div :ref="player.setPlayerBox" class="player-box">
    <div class="video-wrapper">
        <video :ref="(e) => player.videoElement.setElement(e)" src="./resource/独角.mp4"></video>
    </div>
    <div class="suspended-layer" @mouseover="player.controlLayer.show()" @mouseout="player.controlLayer.close()">
        <!-- 控制器 -->
        <div class="video-control" v-show="player.controlLayer.isShow">
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
                <el-slider v-model="player.progress.value" :max="player.progress.max" :min="player.progress.min" size="small" />
                <!-- 控制按钮 -->
                <div class="buttons">
                    <div class="left">
                        <el-icon :key="player.playStatusKey" @click="player.togglePlaybackState()">
                            <video-play v-show="player.videoElement.paused" />
                            <video-pause v-show="!player.videoElement.paused" />
                        </el-icon>
                    </div>
                    <div class="right">
                        <el-popover placement="top-start" :width="1" trigger="hover">
                            <el-slider v-model="player.videoElement.volume" vertical height="200px" />
                            <template #reference>
                                <el-icon>
                                    <headset />
                                </el-icon>
                            </template>
                        </el-popover>

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
