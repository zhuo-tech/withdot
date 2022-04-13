<script lang="ts" setup>
import ProgressBar from '@/components/VideoPlayer/components/ProgressBar.vue'
import { PlayerContext } from '@/components/VideoPlayer/context/PlayerContext'
import VideoPlayer from '@/components/VideoPlayer/index.vue'
import { TimeUnit } from 'typescript-util'
import { provide, reactive } from 'vue'
import AddPoint from './components/AddPoint.vue'
import IconLabel from './components/IconLabel'
import List from './components/List.vue'
import { DotTypeOption, VideoEditorContext } from './context/VideoEditorContext'

/**
 * 编辑器
 * @provide {@link VideoEditorContext}
 * @provide {@link PlayerContext} 向下注入播放器的上下文 替换播放器自身
 */
const context = reactive(new VideoEditorContext())
provide(VideoEditorContext.INJECTION_KEY, context as any)
provide(PlayerContext.INJECTION_KEY, context.playerContext as any)

const {pointList, playerContext} = context
const {videoElement, minDuration} = playerContext

const controlDrawer = reactive({
    isShow: false,
    show() {
        this.isShow = true
    },
    close() {
        this.isShow = false
    },
})

</script>

<template>
<div class="video-editor-box">

    <AddPoint :current-play-time="playerContext.videoElement.playTime">
        <template #header>
            <ProgressBar v-model:value="videoElement.playTime"
                         :buffer-value="videoElement.bufferTime"
                         :format-tips="(t) => TimeUnit.SECOND.display(t)"
                         :max="videoElement.maxDuration"
                         :min="minDuration"
                         @change="(time) => videoElement.setPlayTime(time)">
            </ProgressBar>
        </template>
    </AddPoint>

    <!-- 播放器 -->
    <VideoPlayer :point-list="pointList"></VideoPlayer>

    <!-- 底部列表 -->
    <div>
        <el-tabs v-model="context.currentType" stretch type="card">
            <el-tab-pane v-for="item in DotTypeOption" :key="item.type" :label="item.label" :name="item.label">
                <template #label>
                    <IconLabel :icon="item.icon" :label="item.label" />
                </template>
            </el-tab-pane>
        </el-tabs>
        <List :list="pointList">
            <template v-slot:prefix>
                <el-icon>
                    <postcard />
                </el-icon>
            </template>
            <template v-slot:content="{item, index}">
                {{ item }}
            </template>
            <template v-slot:operating="{item, index}">
                <el-button type="primary" @click="controlDrawer.show()">
                    显示列表
                </el-button>
            </template>
        </List>
    </div>
    <!-- 侧边抽屉 -->
    <el-drawer v-model="controlDrawer.isShow" title="I am the title">
        <template #title>
            <h1>啊~ 抽屉列表-----------------</h1>
        </template>
        <List :list="pointList">
            <template v-slot:prefix>
                <el-icon>
                    <postcard />
                </el-icon>
            </template>
            <template v-slot:content="{item, index}">
                {{ item }}
            </template>
            <template v-slot:operating="{item, index}">
                <el-button type="primary">
                    ---
                </el-button>
            </template>
        </List>
    </el-drawer>

</div>

</template>

<style lang="sass" scoped src="./style/VideoEditorStyle.sass" />
