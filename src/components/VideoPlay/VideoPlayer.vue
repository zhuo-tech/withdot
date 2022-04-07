<script lang="ts">
import ProgressBar from '@/components/VideoPlay/components/ProgressBar.vue'
import { VideoPlayerScript } from '@/components/VideoPlay/service/VideoPlayerScript'
import { defineComponent } from 'vue'

export default defineComponent({
    components: {ProgressBar},
    data() {
        const {
            controlLayer,
            videoElement,
            setPlayerBox,
            playStatusKey,
            progress,
            togglePlaybackState,
            toggleFullScreen,
        } = new VideoPlayerScript()
        // IDE 不提供直接返回 new Object() 的类型分析
        return {controlLayer, videoElement, setPlayerBox, playStatusKey, progress, togglePlaybackState, toggleFullScreen}
    },
})
</script>

<template>
<div :ref="setPlayerBox" class="player-box">
    <div class="video-wrapper">
        <video :ref="(e) => videoElement.setElement(e)" src="./resource/独角.mp4"></video>
    </div>
    <div class="suspended-layer" @mouseout="controlLayer.close()" @mouseover="controlLayer.show()">
        <!-- 控制器 -->
        <div v-show="controlLayer.isShow" class="video-control">
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
                <ProgressBar v-model:value="progress.value" :max="progress.max" :min="progress.min" />
                <!-- 控制按钮 -->
                <div class="buttons">
                    <div class="left">
                        <el-icon :key="playStatusKey" @click="togglePlaybackState">
                            <video-play v-show="videoElement.paused" />
                            <video-pause v-show="!videoElement.paused" />
                        </el-icon>
                    </div>
                    <div class="right">
                        <el-popover :width="1" placement="top-start" trigger="hover">
                            <el-slider v-model="videoElement.volume" height="200px" vertical />
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
                        <el-icon @click="toggleFullScreen">
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
